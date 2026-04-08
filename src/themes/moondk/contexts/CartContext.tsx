import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { CartItem } from "../components/header/ShoppingBag";
import { debugError } from "@/utils/debugLogger";
import {
  applyMedusaCartPriceHint,
  getMoondkMedusa,
  isMoondkMedusaEnabled,
  mapMedusaCartLineItemsToCartItems,
  MOONDK_MEDUSA_CART_RETRIEVE_FIELDS,
  preserveMedusaCartDisplayPrices,
  resolveMoondkMedusaRegionId,
} from "../lib/medusa";

interface CartContextType {
  cartItems: CartItem[];
  /** Medusa cart id when using Medusa; otherwise null. */
  medusaCartId: string | null;
  addToCart: (item: Omit<CartItem, "id">, openCartAfterAdd?: boolean) => Promise<void>;
  updateQuantity: (id: string, newQuantity: number) => Promise<void>;
  removeFromCart: (id: string) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshMedusaCart: () => Promise<void>;
  totalItems: number;
  openCart: () => void;
  closeCart: () => void;
  isCartOpen: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

const CART_STORAGE_KEY = "moondk_cart_items";
const MEDUSA_CART_STORAGE_KEY = "moondk_medusa_cart_id";

function loadLocalCartFromStorage(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as unknown;
      if (!Array.isArray(parsed)) return [];
      return parsed.map((row: unknown) => {
        const r = row as CartItem;
        return {
          ...r,
          id: typeof r.id === "number" ? String(r.id) : String(r.id ?? ""),
        };
      });
    }
  } catch (error) {
    debugError("Failed to load cart from localStorage:", error);
  }
  return [];
}

function saveLocalCartToStorage(items: CartItem[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    debugError("Failed to save cart to localStorage:", error);
  }
}

function readMedusaCartId(): string | null {
  if (typeof window === "undefined") return null;
  const id = localStorage.getItem(MEDUSA_CART_STORAGE_KEY);
  return id && id.trim() ? id.trim() : null;
}

/** Read Medusa cart id from localStorage (use when React state was cleared but id may still be stored). */
export function readStoredMoondkMedusaCartId(): string | null {
  return readMedusaCartId();
}

function writeMedusaCartId(id: string | null) {
  if (typeof window === "undefined") return;
  if (id) localStorage.setItem(MEDUSA_CART_STORAGE_KEY, id);
  else localStorage.removeItem(MEDUSA_CART_STORAGE_KEY);
}

function applyCartItemQuantity(items: CartItem[], lineId: string, newQuantity: number): CartItem[] {
  if (newQuantity <= 0) {
    return items.filter((item) => item.id !== lineId);
  }
  return items.map((item) =>
    item.id === lineId ? { ...item, quantity: newQuantity } : item,
  );
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const medusaMode = isMoondkMedusaEnabled();
  const [cartItems, setCartItems] = useState<CartItem[]>(() =>
    medusaMode ? [] : loadLocalCartFromStorage(),
  );
  const [medusaCartId, setMedusaCartId] = useState<string | null>(() =>
    medusaMode ? readMedusaCartId() : null,
  );
  const [isCartOpen, setIsCartOpen] = useState(false);

  const refreshMedusaCart = useCallback(async () => {
    if (!medusaMode) return;
    const id = readMedusaCartId();
    if (!id) {
      setCartItems([]);
      setMedusaCartId(null);
      return;
    }
    try {
      const api = getMoondkMedusa();
      const { cart } = await api.cart.retrieve(id, { fields: MOONDK_MEDUSA_CART_RETRIEVE_FIELDS });
      setMedusaCartId(cart?.id ?? id);
      setCartItems((prev) =>
        preserveMedusaCartDisplayPrices(
          mapMedusaCartLineItemsToCartItems(cart?.items as unknown[]),
          prev,
        ),
      );
    } catch (e) {
      debugError("refreshMedusaCart failed:", e);
      writeMedusaCartId(null);
      setMedusaCartId(null);
      setCartItems([]);
    }
  }, [medusaMode]);

  useEffect(() => {
    if (!medusaMode) return;
    let cancelled = false;
    (async () => {
      await refreshMedusaCart();
    })();
    return () => {
      cancelled = true;
      void cancelled;
    };
  }, [medusaMode, refreshMedusaCart]);

  useEffect(() => {
    if (medusaMode) return;
    saveLocalCartToStorage(cartItems);
  }, [cartItems, medusaMode]);

  const addToCart = async (item: Omit<CartItem, "id">, openCartAfterAdd: boolean = false) => {
    if (!medusaMode) {
      const existingItemIndex = cartItems.findIndex((cartItem) => cartItem.name === item.name);
      if (existingItemIndex >= 0) {
        setCartItems((items) =>
          items.map((cartItem, index) =>
            index === existingItemIndex
              ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
              : cartItem,
          ),
        );
      } else {
        const numericMax = Math.max(
          0,
          ...cartItems.map((i) => {
            const n = parseInt(String(i.id), 10);
            return Number.isFinite(n) ? n : 0;
          }),
        );
        const newId = String(numericMax + 1);
        setCartItems((items) => [...items, { ...item, id: newId }]);
      }
      if (openCartAfterAdd) setIsCartOpen(true);
      return;
    }

    if (!item.variantId) {
      debugError("addToCart (Medusa): missing variantId");
      return;
    }

    try {
      const api = getMoondkMedusa();
      let cartId = readMedusaCartId();
      if (!cartId) {
        const regionId = await resolveMoondkMedusaRegionId();
        const { cart: created } = await api.cart.create(
          { region_id: regionId },
          { fields: MOONDK_MEDUSA_CART_RETRIEVE_FIELDS },
        );
        cartId = created?.id ?? null;
        if (!cartId) throw new Error("Medusa cart.create returned no id");
        writeMedusaCartId(cartId);
        setMedusaCartId(cartId);
      }

      const sameVariant = cartItems.find((i) => i.variantId === item.variantId);
      if (sameVariant?.id) {
        const { cart } = await api.cart.updateLineItem(
          cartId,
          sameVariant.id,
          { quantity: sameVariant.quantity + item.quantity },
          { fields: MOONDK_MEDUSA_CART_RETRIEVE_FIELDS },
        );
        setCartItems((prev) =>
          preserveMedusaCartDisplayPrices(
            applyMedusaCartPriceHint(
              mapMedusaCartLineItemsToCartItems(cart?.items as unknown[]),
              item,
            ),
            prev,
          ),
        );
      } else {
        const { cart } = await api.cart.addLineItem(
          cartId,
          { variant_id: item.variantId, quantity: item.quantity },
          { fields: MOONDK_MEDUSA_CART_RETRIEVE_FIELDS },
        );
        setCartItems((prev) =>
          preserveMedusaCartDisplayPrices(
            applyMedusaCartPriceHint(
              mapMedusaCartLineItemsToCartItems(cart?.items as unknown[]),
              item,
            ),
            prev,
          ),
        );
      }
      if (cartId) setMedusaCartId(cartId);
      if (openCartAfterAdd) setIsCartOpen(true);
    } catch (e) {
      debugError("addToCart (Medusa) failed:", e);
    }
  };

  const updateQuantity = async (id: string, newQuantity: number) => {
    if (!medusaMode) {
      if (newQuantity <= 0) {
        setCartItems((items) => items.filter((item) => item.id !== id));
      } else {
        setCartItems((items) =>
          items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)),
        );
      }
      return;
    }

    const cartId = readMedusaCartId();
    if (!cartId) return;

    const previousItems = cartItems;
    setCartItems((items) => applyCartItemQuantity(items, id, newQuantity));

    try {
      const api = getMoondkMedusa();
      if (newQuantity <= 0) {
        await api.cart.removeLineItem(cartId, id, { fields: MOONDK_MEDUSA_CART_RETRIEVE_FIELDS });
      } else {
        await api.cart.updateLineItem(
          cartId,
          id,
          { quantity: newQuantity },
          { fields: MOONDK_MEDUSA_CART_RETRIEVE_FIELDS },
        );
      }
      await refreshMedusaCart();
    } catch (e) {
      debugError("updateQuantity (Medusa) failed:", e);
      setCartItems(previousItems);
    }
  };

  const removeFromCart = async (id: string) => {
    await updateQuantity(id, 0);
  };

  const clearCart = async () => {
    if (!medusaMode) {
      setCartItems([]);
      if (typeof window !== "undefined") {
        localStorage.removeItem(CART_STORAGE_KEY);
      }
      return;
    }
    writeMedusaCartId(null);
    setMedusaCartId(null);
    setCartItems([]);
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        medusaCartId,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        refreshMedusaCart,
        totalItems,
        openCart,
        closeCart,
        isCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
