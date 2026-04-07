import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Check, CreditCard, Minus, Plus, CalendarIcon } from "lucide-react";
import { format } from "date-fns";

import Footer from "../components/footer/Footer";
import CheckoutHeader from "../components/header/CheckoutHeader";
import { useCart } from "../contexts/CartContext";
import {
  isMoondkMedusaEnabled,
  MOONDK_MEDUSA_CART_RETRIEVE_FIELDS,
  getMoondkMedusa,
  runMoondkMedusaCheckout,
  medusaDisplayAmount,
  isMoondkHitPayReturnSearchParams,
  pollMoondkMedusaCartToOrder,
  fetchMoondkMedusaPaymentProviderOptions,
  pickDefaultMedusaPaymentProviderId,
  type MedusaPaymentProviderOption,
} from "../lib/medusa";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { debugLog, debugError } from "@/utils/debugLogger";
import { FREE_DELIVERY_THRESHOLD } from "../constants";

type MedusaShipOption = { id: string; name?: string };

export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const medusaMounted = useRef(true);
  const medusaMode = isMoondkMedusaEnabled();
  const { cartItems, updateQuantity, clearCart, medusaCartId } = useCart();
  const clearCartRef = useRef(clearCart);
  clearCartRef.current = clearCart;
  const [showDiscountInput, setShowDiscountInput] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [customerDetails, setCustomerDetails] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
  });
  const [shippingAddress, setShippingAddress] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "Singapore",
  });
  const [hasSeparateBilling, setHasSeparateBilling] = useState(false);
  const [billingDetails, setBillingDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Singapore",
  });
  const [shippingOption, setShippingOption] = useState("standard");
  const [agreeToDoorstep, setAgreeToDoorstep] = useState(false);
  const [shippingComments, setShippingComments] = useState("");
  const [pickupDate, setPickupDate] = useState<Date | undefined>(undefined);
  const [pickupDateError, setPickupDateError] = useState("");
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);

  const [medusaShipOptions, setMedusaShipOptions] = useState<MedusaShipOption[]>([]);
  const [medusaShippingOptionId, setMedusaShippingOptionId] = useState("");
  const [medusaPaymentProviders, setMedusaPaymentProviders] = useState<MedusaPaymentProviderOption[]>([]);
  const [medusaPaymentProviderId, setMedusaPaymentProviderId] = useState("");
  const [medusaCartTotals, setMedusaCartTotals] = useState({
    item: 0,
    shipping: 0,
    total: 0,
  });
  const [medusaCheckoutError, setMedusaCheckoutError] = useState<string | null>(null);
  const [hitPayConfirming, setHitPayConfirming] = useState(false);

  useEffect(() => {
    medusaMounted.current = true;
    return () => {
      medusaMounted.current = false;
    };
  }, []);

  /** HitPay (or other hosted) redirect: confirm order after Medusa webhook captures payment. */
  useEffect(() => {
    if (!medusaMode || !medusaCartId) {
      setHitPayConfirming(false);
      return;
    }
    const qs = new URLSearchParams(location.search);
    if (!isMoondkHitPayReturnSearchParams(qs)) {
      setHitPayConfirming(false);
      return;
    }

    let ignore = false;
    setHitPayConfirming(true);
    setMedusaCheckoutError(null);

    void (async () => {
      const out = await pollMoondkMedusaCartToOrder(medusaCartId);
      if (ignore || !medusaMounted.current) return;
      setHitPayConfirming(false);
      if (out.ok === false) {
        setMedusaCheckoutError(out.message);
        if (out.pending) {
          navigate({ pathname: location.pathname, search: "" }, { replace: true });
        }
        return;
      }
      setPaymentComplete(true);
      await clearCartRef.current();
      navigate({ pathname: location.pathname, search: "" }, { replace: true });
    })();

    return () => {
      ignore = true;
    };
  }, [medusaMode, medusaCartId, location.pathname, location.search, navigate]);

  useEffect(() => {
    if (!medusaMode || !medusaCartId) {
      setMedusaShipOptions([]);
      setMedusaShippingOptionId("");
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const api = getMoondkMedusa();
        const { shipping_options } = await api.checkout.listShippingOptions({ cart_id: medusaCartId });
        const raw = (shipping_options ?? []) as unknown[];
        const opts: MedusaShipOption[] = raw
          .map((o) => {
            const r = o as Record<string, unknown>;
            const id = typeof r.id === "string" ? r.id : "";
            const name = typeof r.name === "string" ? r.name : id;
            return id ? { id, name } : null;
          })
          .filter(Boolean) as MedusaShipOption[];
        if (!cancelled) {
          setMedusaShipOptions(opts);
          setMedusaShippingOptionId((prev) => {
            if (prev && opts.some((o) => o.id === prev)) return prev;
            return opts[0]?.id ?? "";
          });
        }
      } catch (e) {
        debugError("Medusa listShippingOptions failed:", e);
        if (!cancelled) setMedusaShipOptions([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [medusaMode, medusaCartId, cartItems]);

  useEffect(() => {
    if (!medusaMode || !medusaCartId) {
      setMedusaCartTotals({ item: 0, shipping: 0, total: 0 });
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const api = getMoondkMedusa();
        const { cart } = await api.cart.retrieve(medusaCartId, {
          fields: MOONDK_MEDUSA_CART_RETRIEVE_FIELDS,
        });
        if (cancelled || !cart) return;
        setMedusaCartTotals({
          item: medusaDisplayAmount(cart.item_subtotal ?? cart.subtotal),
          shipping: medusaDisplayAmount(cart.shipping_total),
          total: medusaDisplayAmount(cart.total),
        });
      } catch (e) {
        debugError("Medusa cart.retrieve (checkout totals) failed:", e);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [medusaMode, medusaCartId, cartItems]);

  useEffect(() => {
    if (!medusaMode || !medusaCartId) {
      setMedusaPaymentProviders([]);
      setMedusaPaymentProviderId("");
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const api = getMoondkMedusa();
        const { cart } = await api.cart.retrieve(medusaCartId, { fields: "region_id" });
        const regionId = cart?.region_id;
        if (!regionId || cancelled) return;
        const options = await fetchMoondkMedusaPaymentProviderOptions(regionId);
        if (cancelled) return;
        setMedusaPaymentProviders(options);
        const envPid = import.meta.env.VITE_MEDUSA_PAYMENT_PROVIDER_ID?.trim() ?? null;
        const ids = options.map((o) => o.id);
        setMedusaPaymentProviderId((prev) => {
          if (prev && ids.includes(prev)) return prev;
          return pickDefaultMedusaPaymentProviderId(ids, envPid) ?? "";
        });
      } catch (e) {
        debugError("Medusa listPaymentProviders (checkout) failed:", e);
        if (!cancelled) {
          setMedusaPaymentProviders([]);
          setMedusaPaymentProviderId("");
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [medusaMode, medusaCartId, cartItems]);

  const subtotal = useMemo(() => {
    if (medusaMode && medusaCartId) {
      return medusaCartTotals.item;
    }
    return cartItems.reduce((sum, item) => {
      const price = parseFloat(item.price.replace("$", "").replace(",", ""));
      return sum + price * item.quantity;
    }, 0);
  }, [medusaMode, medusaCartId, medusaCartTotals.item, cartItems]);

  const getShippingCost = () => {
    switch (shippingOption) {
      case "express":
        return 35;
      case "standard":
        return subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : 15;
      case "self-pickup":
        return 0;
      default:
        return subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : 15;
    }
  };

  const shipping = medusaMode && medusaCartId ? medusaCartTotals.shipping : getShippingCost();
  const total = medusaMode && medusaCartId ? medusaCartTotals.total : subtotal + shipping;
  const freeShippingThreshold = 150;
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  // Helper function to get minimum pickup date (today + 2 days)
  const getMinSelfPickupDate = (): Date => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const minDate = new Date(today);
    minDate.setDate(today.getDate() + 2);
    return minDate;
  };

  // Helper function to check if a date is allowed for self pickup
  const isSelfPickupDateAllowed = (date: Date): boolean => {
    const minDate = getMinSelfPickupDate();
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);
    return checkDate >= minDate;
  };

  // Handle shipping option change - clear pickup date if switching away from self-pickup
  const handleShippingOptionChange = (value: string) => {
    setShippingOption(value);
    if (value !== "self-pickup") {
      setPickupDate(undefined);
      setPickupDateError("");
    }
  };

  const handleDiscountSubmit = () => {
    debugLog("Discount code submitted:", discountCode);
    setShowDiscountInput(false);
  };

  const handleCustomerDetailsChange = (field: string, value: string) => {
    setCustomerDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleShippingAddressChange = (field: string, value: string) => {
    setShippingAddress((prev) => ({ ...prev, [field]: value }));
  };

  const handleBillingDetailsChange = (field: string, value: string) => {
    setBillingDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handlePaymentDetailsChange = (field: string, value: string) => {
    setPaymentDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleCompleteOrder = async () => {
    setMedusaCheckoutError(null);

    if (medusaMode) {
      if (!medusaCartId) {
        setMedusaCheckoutError("No cart. Add items before checkout.");
        return;
      }
      if (!medusaShippingOptionId) {
        setMedusaCheckoutError("Select a shipping option.");
        return;
      }
      if (!medusaPaymentProviderId) {
        setMedusaCheckoutError("Select a payment method.");
        return;
      }
      if (
        !customerDetails.email?.trim() ||
        !customerDetails.firstName?.trim() ||
        !customerDetails.lastName?.trim() ||
        !shippingAddress.address?.trim() ||
        !shippingAddress.postalCode?.trim()
      ) {
        setMedusaCheckoutError("Please complete required customer and shipping fields.");
        return;
      }
      if (hasSeparateBilling) {
        if (
          !billingDetails.firstName?.trim() ||
          !billingDetails.lastName?.trim() ||
          !billingDetails.address?.trim() ||
          !billingDetails.postalCode?.trim()
        ) {
          setMedusaCheckoutError("Please complete billing details.");
          return;
        }
      }

      setIsProcessing(true);
      const billingPayload = hasSeparateBilling
        ? {
            firstName: billingDetails.firstName,
            lastName: billingDetails.lastName,
            address: billingDetails.address,
            city: "Singapore",
            postalCode: billingDetails.postalCode,
            country: billingDetails.country || "Singapore",
            phone: billingDetails.phone,
          }
        : null;

      const result = await runMoondkMedusaCheckout({
        cartId: medusaCartId,
        email: customerDetails.email.trim(),
        shipping: {
          firstName: customerDetails.firstName,
          lastName: customerDetails.lastName,
          address: shippingAddress.address,
          city: shippingAddress.city || "Singapore",
          postalCode: shippingAddress.postalCode,
          country: shippingAddress.country || "Singapore",
          phone: customerDetails.phone,
        },
        billing: billingPayload,
        shippingOptionId: medusaShippingOptionId,
        paymentProviderId: medusaPaymentProviderId,
      });
      setIsProcessing(false);
      if (result.ok === false) {
        setMedusaCheckoutError(result.message);
        return;
      }
      if (result.flow === "redirect") {
        window.location.assign(result.redirectUrl);
        return;
      }
      setPaymentComplete(true);
      await clearCart();
      return;
    }

    if (shippingOption === "self-pickup") {
      if (!pickupDate) {
        setPickupDateError("Please select a pickup date");
        return;
      }
      if (!isSelfPickupDateAllowed(pickupDate)) {
        setPickupDateError("Pickup date must be at least 2 days from today");
        return;
      }
      setPickupDateError("");
    }

    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setPaymentComplete(true);
    await clearCart();
  };

  return (
    <div className="min-h-screen bg-background">
      <CheckoutHeader />

      <main className="pt-6 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          {hitPayConfirming && (
            <div
              className="mb-6 rounded-card border border-border/30 bg-secondary/80 px-4 py-3 text-sm font-body text-foreground"
              role="status"
              aria-live="polite"
            >
              Confirming your payment with the store. This usually takes a few seconds.
            </div>
          )}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Summary */}
            <div className="lg:col-span-1 lg:order-2">
              <div className="bg-secondary p-8 rounded-card sticky top-6">
                <h2 className="text-lg font-heading font-medium text-foreground mb-6">Order Summary</h2>

                <div className="space-y-6">
                  {cartItems.length === 0 ? (
                    <p className="text-sm font-body font-light text-foreground/70">
                      Your cart is empty.
                    </p>
                  ) : (
                    cartItems.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <div className="w-20 h-20 bg-white rounded-card overflow-hidden">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-body font-light text-foreground">{item.name}</h3>
                          {item.category && (
                            <p className="text-sm font-body font-light text-foreground/70 mt-1">
                              {item.category}
                            </p>
                          )}

                          <div className="flex items-center gap-2 mt-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="h-8 w-8 p-0 rounded-full border-border/20"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="text-sm font-body font-medium text-foreground min-w-[2ch] text-center">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="h-8 w-8 p-0 rounded-full border-border/20"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <div className="text-foreground font-body font-medium">{item.price}</div>
                      </div>
                    ))
                  )}
                </div>

                <div className="mt-8 pt-6 border-t border-border/20">
                  {!showDiscountInput ? (
                    <button
                      onClick={() => setShowDiscountInput(true)}
                      className="text-sm font-body font-light text-foreground underline hover:no-underline transition-all"
                    >
                      Discount code
                    </button>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <Input
                          type="text"
                          value={discountCode}
                          onChange={(e) => setDiscountCode(e.target.value)}
                          placeholder="Enter discount code"
                          className="flex-1 rounded-card text-sm md:text-base"
                        />
                        <button
                          onClick={handleDiscountSubmit}
                          className="text-sm font-body font-light text-foreground underline hover:no-underline transition-all px-2"
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="border-t border-border/20 mt-4 pt-6">
                  <div className="flex justify-between text-sm font-body font-light mb-4">
                    <span className="text-foreground/70">Subtotal</span>
                    <span className="text-foreground">${subtotal.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                  
                  {subtotal < freeShippingThreshold && (
                    <div className="mt-4 p-4 bg-white rounded-lg border-2 border-primary/20">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-body font-medium text-foreground">
                          Free Standard Shipping
                        </p>
                        <span className="text-xs font-body font-light text-foreground/60">
                          ${subtotal.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} / ${freeShippingThreshold}
                        </span>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden mb-3">
                        <div 
                          className="h-full bg-primary transition-all duration-300 ease-out rounded-full"
                          style={{ 
                            width: `${Math.min((subtotal / freeShippingThreshold) * 100, 100)}%` 
                          }}
                        />
                      </div>
                      
                      <p className="text-sm font-body font-light text-foreground text-center">
                        Add <span className="font-medium text-primary">${amountNeededForFreeShipping.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span> more to get free standard shipping
                      </p>
                    </div>
                  )}
                  
                  {subtotal >= freeShippingThreshold && (
                    <div className="mt-4 p-4 bg-primary/5 rounded-lg border-2 border-primary/30">
                      <div className="flex items-center justify-center gap-2">
                        <svg 
                          className="w-5 h-5 text-primary" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M5 13l4 4L19 7" 
                          />
                        </svg>
                        <p className="text-sm font-body font-medium text-primary">
                          You qualify for free standard shipping!
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Forms */}
            <div className="lg:col-span-2 lg:order-1 space-y-8">
              <div className="bg-white p-8 rounded-card border border-border/20">
                <h2 className="text-lg font-heading font-medium text-foreground mb-6">Customer Details</h2>

                <div className="space-y-6">
                  <div>
                    <Label htmlFor="email" className="text-sm font-body font-light text-foreground">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={customerDetails.email}
                      onChange={(e) => handleCustomerDetailsChange("email", e.target.value)}
                      className="mt-2 rounded-card text-sm md:text-base"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-sm font-body font-light text-foreground">
                        First Name *
                      </Label>
                      <Input
                        id="firstName"
                        type="text"
                        value={customerDetails.firstName}
                        onChange={(e) => handleCustomerDetailsChange("firstName", e.target.value)}
                        className="mt-2 rounded-card text-sm md:text-base"
                        placeholder="First name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-sm font-body font-light text-foreground">
                        Last Name *
                      </Label>
                      <Input
                        id="lastName"
                        type="text"
                        value={customerDetails.lastName}
                        onChange={(e) => handleCustomerDetailsChange("lastName", e.target.value)}
                        className="mt-2 rounded-card text-sm md:text-base"
                        placeholder="Last name"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-sm font-body font-light text-foreground">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={customerDetails.phone}
                      onChange={(e) => handleCustomerDetailsChange("phone", e.target.value)}
                      className="mt-2 rounded-card text-sm md:text-base"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div className="border-t border-border/20 pt-6 mt-8">
                    <h3 className="text-base font-heading font-medium text-foreground mb-2">Shipping Address</h3>
                    <p className="text-sm font-body font-light text-foreground/70 mb-4">
                      Delivery is only available to Singapore addresses.
                    </p>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="shippingAddress" className="text-sm font-body font-light text-foreground">
                          Address *
                        </Label>
                        <Input
                          id="shippingAddress"
                          type="text"
                          value={shippingAddress.address}
                          onChange={(e) => handleShippingAddressChange("address", e.target.value)}
                          className="mt-2 rounded-card text-sm md:text-base"
                          placeholder="e.g., 123 Orchard Road, #05-10"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="shippingCity" className="text-sm font-body font-light text-foreground">
                            City *
                          </Label>
                          <Input
                            id="shippingCity"
                            type="text"
                            value="Singapore"
                            disabled
                            className="mt-2 rounded-card bg-muted/50 cursor-not-allowed text-sm md:text-base"
                            placeholder="Singapore"
                          />
                        </div>
                        <div>
                          <Label htmlFor="shippingPostalCode" className="text-sm font-body font-light text-foreground">
                            Postal Code *
                          </Label>
                          <Input
                            id="shippingPostalCode"
                            type="text"
                            value={shippingAddress.postalCode}
                            onChange={(e) => handleShippingAddressChange("postalCode", e.target.value)}
                            className="mt-2 rounded-card text-sm md:text-base"
                            placeholder="e.g., 238801"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-border/20 pt-6 mt-8">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="separateBilling"
                        checked={hasSeparateBilling}
                        onCheckedChange={(checked) => setHasSeparateBilling(checked === true)}
                      />
                      <Label
                        htmlFor="separateBilling"
                        className="text-sm font-body font-light text-foreground cursor-pointer"
                      >
                        Other billing address
                      </Label>
                    </div>
                  </div>

                  {hasSeparateBilling && (
                    <div className="space-y-6 pt-4">
                      <h3 className="text-base font-heading font-medium text-foreground">Billing Details</h3>

                      <div>
                        <Label htmlFor="billingEmail" className="text-sm font-body font-light text-foreground">
                          Email Address *
                        </Label>
                        <Input
                          id="billingEmail"
                          type="email"
                          value={billingDetails.email}
                          onChange={(e) => handleBillingDetailsChange("email", e.target.value)}
                          className="mt-2 rounded-card text-sm md:text-base"
                          placeholder="Enter billing email"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="billingFirstName" className="text-sm font-body font-light text-foreground">
                            First Name *
                          </Label>
                          <Input
                            id="billingFirstName"
                            type="text"
                            value={billingDetails.firstName}
                            onChange={(e) => handleBillingDetailsChange("firstName", e.target.value)}
                            className="mt-2 rounded-card text-sm md:text-base"
                            placeholder="First name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="billingLastName" className="text-sm font-body font-light text-foreground">
                            Last Name *
                          </Label>
                          <Input
                            id="billingLastName"
                            type="text"
                            value={billingDetails.lastName}
                            onChange={(e) => handleBillingDetailsChange("lastName", e.target.value)}
                            className="mt-2 rounded-card text-sm md:text-base"
                            placeholder="Last name"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="billingPhone" className="text-sm font-body font-light text-foreground">
                          Phone Number
                        </Label>
                        <Input
                          id="billingPhone"
                          type="tel"
                          value={billingDetails.phone}
                          onChange={(e) => handleBillingDetailsChange("phone", e.target.value)}
                          className="mt-2 rounded-card text-sm md:text-base"
                          placeholder="Enter billing phone number"
                        />
                      </div>

                      <div>
                        <Label htmlFor="billingAddress" className="text-sm font-body font-light text-foreground">
                          Address *
                        </Label>
                        <Input
                          id="billingAddress"
                          type="text"
                          value={billingDetails.address}
                          onChange={(e) => handleBillingDetailsChange("address", e.target.value)}
                          className="mt-2 rounded-card text-sm md:text-base"
                          placeholder="e.g., 123 Orchard Road, #05-10"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="billingCity" className="text-sm font-body font-light text-foreground">
                            City *
                          </Label>
                          <Input
                            id="billingCity"
                            type="text"
                            value="Singapore"
                            disabled
                            className="mt-2 rounded-card bg-muted/50 cursor-not-allowed text-sm md:text-base"
                            placeholder="Singapore"
                          />
                        </div>
                        <div>
                          <Label htmlFor="billingPostalCode" className="text-sm font-body font-light text-foreground">
                            Postal Code *
                          </Label>
                          <Input
                            id="billingPostalCode"
                            type="text"
                            value={billingDetails.postalCode}
                            onChange={(e) => handleBillingDetailsChange("postalCode", e.target.value)}
                            className="mt-2 rounded-card text-sm md:text-base"
                            placeholder="e.g., 238801"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white p-8 rounded-card border border-border/20">
                <h2 className="text-lg font-heading font-medium text-foreground mb-6">Shipping Options</h2>

                {medusaMode ? (
                  medusaShipOptions.length === 0 ? (
                    <p className="text-sm font-body font-light text-foreground/70">
                      {medusaCartId
                        ? "No shipping options returned for this cart. Check fulfillment setup in Medusa."
                        : "Your cart is empty."}
                    </p>
                  ) : (
                    <RadioGroup
                      value={medusaShippingOptionId}
                      onValueChange={setMedusaShippingOptionId}
                      className="space-y-4"
                    >
                      {medusaShipOptions.map((opt) => (
                        <Label
                          key={opt.id}
                          htmlFor={`ship-${opt.id}`}
                          className={`flex items-center justify-between p-4 border rounded-card cursor-pointer transition-all duration-200 ${
                            medusaShippingOptionId === opt.id
                              ? "border-primary bg-primary/5"
                              : "border-border/20 hover:border-primary/30 hover:bg-secondary/30"
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <RadioGroupItem value={opt.id} id={`ship-${opt.id}`} />
                            <span className="font-body font-light text-foreground">{opt.name || opt.id}</span>
                          </div>
                        </Label>
                      ))}
                    </RadioGroup>
                  )
                ) : (
                  <RadioGroup value={shippingOption} onValueChange={handleShippingOptionChange} className="space-y-4">
                    <Label
                      htmlFor="standard"
                      className={`flex items-center justify-between p-4 border rounded-card cursor-pointer transition-all duration-200 ${
                        shippingOption === "standard"
                          ? "border-primary bg-primary/5"
                          : "border-border/20 hover:border-primary/30 hover:bg-secondary/30"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="standard" id="standard" />
                        <span className="font-body font-light text-foreground">Standard Shipping</span>
                      </div>
                      <div className="text-xs md:text-sm font-body font-light text-foreground/70 text-right md:text-left">
                        {subtotal >= 150 ? "Free" : "$15"} • 3-5 business days
                      </div>
                    </Label>

                    <Label
                      htmlFor="express"
                      className={`flex items-center justify-between p-4 border rounded-card cursor-pointer transition-all duration-200 ${
                        shippingOption === "express"
                          ? "border-primary bg-primary/5"
                          : "border-border/20 hover:border-primary/30 hover:bg-secondary/30"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="express" id="express" />
                        <span className="font-body font-light text-foreground">Express Shipping</span>
                      </div>
                      <div className="text-xs md:text-sm font-body font-light text-foreground/70 text-right md:text-left">
                        $35 • 1-2 business days
                      </div>
                    </Label>

                    <Label
                      htmlFor="self-pickup"
                      className={`flex items-center justify-between p-4 border rounded-card cursor-pointer transition-all duration-200 ${
                        shippingOption === "self-pickup"
                          ? "border-primary bg-primary/5"
                          : "border-border/20 hover:border-primary/30 hover:bg-secondary/30"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="self-pickup" id="self-pickup" />
                        <span className="font-body font-light text-foreground">Self Pickup</span>
                      </div>
                      <div className="text-xs md:text-sm font-body font-light text-foreground/70 text-right md:text-left">
                        Free • Pickup from 2 days
                      </div>
                    </Label>
                  </RadioGroup>
                )}

                {/* Conditional fields for Standard and Express Shipping */}
                {!medusaMode && (shippingOption === "standard" || shippingOption === "express") && (
                  <div className="mt-6 pt-6 border-t border-border/20 space-y-6">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="agreeToDoorstep"
                        checked={agreeToDoorstep}
                        onCheckedChange={(checked) => setAgreeToDoorstep(checked === true)}
                      />
                      <Label
                        htmlFor="agreeToDoorstep"
                        className="text-sm font-body font-light text-foreground cursor-pointer"
                      >
                        Agree to place at doorsteps
                      </Label>
                    </div>

                    <div>
                      <Label htmlFor="shippingComments" className="text-sm font-body font-light text-foreground">
                        Comments
                      </Label>
                      <Textarea
                        id="shippingComments"
                        value={shippingComments}
                        onChange={(e) => setShippingComments(e.target.value)}
                        className="mt-2 rounded-card min-h-[100px] resize-none text-sm md:text-base"
                        placeholder="Please provide any additional delivery instructions or information..."
                      />
                    </div>
                  </div>
                )}

                {/* Conditional fields for Self Pickup */}
                {!medusaMode && shippingOption === "self-pickup" && (
                  <div className="mt-6 pt-6 border-t border-border/20 space-y-6">
                    <div>
                      <Label htmlFor="pickupDate" className="text-sm font-body font-light text-foreground">
                        Pickup Date * <span className="text-xs text-foreground/60">(Available from {format(getMinSelfPickupDate(), "MMM d, yyyy")})</span>
                      </Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            id="pickupDate"
                            variant="outline"
                            className={cn(
                              "w-full mt-2 justify-start text-left font-normal rounded-card text-sm md:text-base",
                              !pickupDate && "text-muted-foreground",
                              pickupDateError && "border-red-500"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {pickupDate ? format(pickupDate, "PPP") : <span>Select pickup date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={pickupDate}
                            onSelect={(date) => {
                              setPickupDate(date);
                              if (date) {
                                setPickupDateError("");
                              }
                            }}
                            disabled={(date) => !isSelfPickupDateAllowed(date)}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      {pickupDateError && (
                        <p className="mt-2 text-sm text-red-500 font-body font-light">{pickupDateError}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-white p-8 rounded-card border border-border/20">
                <h2 className="text-lg font-heading font-medium text-foreground mb-6">Payment Details</h2>

                {!paymentComplete ? (
                  <div className="space-y-6">
                    {!medusaMode && (
                      <>
                        <div>
                          <Label htmlFor="cardholderName" className="text-sm font-body font-light text-foreground">
                            Cardholder Name *
                          </Label>
                          <Input
                            id="cardholderName"
                            type="text"
                            value={paymentDetails.cardholderName}
                            onChange={(e) => handlePaymentDetailsChange("cardholderName", e.target.value)}
                            className="mt-2 rounded-card text-sm md:text-base"
                            placeholder="Name on card"
                          />
                        </div>

                        <div>
                          <Label htmlFor="cardNumber" className="text-sm font-body font-light text-foreground">
                            Card Number *
                          </Label>
                          <div className="relative mt-2">
                            <Input
                              id="cardNumber"
                              type="text"
                              value={paymentDetails.cardNumber}
                              onChange={(e) => {
                                const value = e.target.value
                                  .replace(/\s/g, "")
                                  .replace(/(.{4})/g, "$1 ")
                                  .trim();
                                if (value.length <= 19) {
                                  handlePaymentDetailsChange("cardNumber", value);
                                }
                              }}
                              className="rounded-card pl-10 text-sm md:text-base"
                              placeholder="4242 4242 4242 4242"
                              maxLength={19}
                            />
                            <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground/50" />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiryDate" className="text-sm font-body font-light text-foreground">
                              Expiry Date *
                            </Label>
                            <Input
                              id="expiryDate"
                              type="text"
                              value={paymentDetails.expiryDate}
                              onChange={(e) => {
                                const value = e.target.value
                                  .replace(/\D/g, "")
                                  .replace(/(\d{2})(\d{2})/, "$1/$2");
                                if (value.length <= 5) {
                                  handlePaymentDetailsChange("expiryDate", value);
                                }
                              }}
                              className="mt-2 rounded-card text-sm md:text-base"
                              placeholder="MM/YY"
                              maxLength={5}
                            />
                          </div>
                          <div>
                            <Label htmlFor="cvv" className="text-sm font-body font-light text-foreground">
                              CVV *
                            </Label>
                            <Input
                              id="cvv"
                              type="text"
                              value={paymentDetails.cvv}
                              onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, "");
                                if (value.length <= 3) {
                                  handlePaymentDetailsChange("cvv", value);
                                }
                              }}
                              className="mt-2 rounded-card text-sm md:text-base"
                              placeholder="123"
                              maxLength={3}
                            />
                          </div>
                        </div>
                      </>
                    )}

                    {medusaMode && (
                      <div className="space-y-4">
                        {medusaPaymentProviders.length === 0 ? (
                          <p className="text-sm font-body font-light text-foreground/80">
                            No payment methods are available for this region. In Medusa Admin, open Settings → Regions,
                            edit the region, enable HitPay (or your provider) for that region, then refresh this page.
                          </p>
                        ) : (
                          <>
                            <p className="text-sm font-heading font-medium text-foreground">Payment method</p>
                            <RadioGroup
                              value={medusaPaymentProviderId}
                              onValueChange={setMedusaPaymentProviderId}
                              className="space-y-3"
                            >
                              {medusaPaymentProviders.map((p) => (
                                <Label
                                  key={p.id}
                                  htmlFor={`pay-${p.id}`}
                                  className={`flex items-center gap-3 p-4 border rounded-card cursor-pointer transition-all duration-200 ${
                                    medusaPaymentProviderId === p.id
                                      ? "border-primary bg-primary/5"
                                      : "border-border/20 hover:border-primary/30 hover:bg-secondary/30"
                                  }`}
                                >
                                  <RadioGroupItem value={p.id} id={`pay-${p.id}`} />
                                  <span className="font-body font-light text-foreground">{p.label}</span>
                                </Label>
                              ))}
                            </RadioGroup>
                            <p className="text-sm font-body font-light text-foreground/80">
                              For HitPay and similar providers, secure payment opens on their page. You&apos;ll return
                              here afterward while we confirm your order.
                            </p>
                          </>
                        )}
                      </div>
                    )}

                    <div className="bg-secondary p-6 rounded-card border border-border/20 space-y-3">
                      <div className="flex justify-between text-sm font-body font-light">
                        <span className="text-foreground/70">Subtotal</span>
                        <span className="text-foreground">${subtotal.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                      </div>
                      <div className="flex justify-between text-sm font-body font-light">
                        <span className="text-foreground/70">
                          {medusaMode ? "Shipping" : shippingOption === "self-pickup" ? "Self Pickup" : "Shipping"}
                        </span>
                        <span className="text-foreground">
                          {shipping === 0 ? "Free" : `$${shipping.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                        </span>
                      </div>
                      <div className="flex justify-between text-lg font-heading font-medium border-t border-border/20 pt-3">
                        <span className="text-foreground">Total</span>
                        <span className="text-foreground">${total.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                      </div>
                    </div>

                    {medusaCheckoutError && (
                      <p className="text-sm text-destructive font-body" role="alert">
                        {medusaCheckoutError}
                      </p>
                    )}

                    <Button
                      onClick={() => void handleCompleteOrder()}
                      disabled={
                        hitPayConfirming ||
                        isProcessing ||
                        cartItems.length === 0 ||
                        (medusaMode
                          ? !medusaCartId ||
                            !medusaShippingOptionId ||
                            !medusaPaymentProviderId ||
                            !customerDetails.email?.trim() ||
                            !customerDetails.firstName?.trim() ||
                            !customerDetails.lastName?.trim() ||
                            !shippingAddress.address?.trim() ||
                            !shippingAddress.postalCode?.trim() ||
                            (hasSeparateBilling &&
                              (!billingDetails.firstName?.trim() ||
                                !billingDetails.lastName?.trim() ||
                                !billingDetails.address?.trim() ||
                                !billingDetails.postalCode?.trim()))
                          : !paymentDetails.cardNumber ||
                            !paymentDetails.expiryDate ||
                            !paymentDetails.cvv ||
                            !paymentDetails.cardholderName ||
                            (shippingOption === "self-pickup" && !pickupDate))
                      }
                      className="w-full rounded-full h-12 text-base bg-primary hover:bg-primary-hover text-white font-body font-medium"
                    >
                      {hitPayConfirming
                        ? "Confirming payment…"
                        : isProcessing
                          ? "Processing..."
                          : `Complete Order • $${total.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                      <Check className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-heading font-medium text-foreground mb-2">Order Complete!</h3>
                    <p className="text-foreground/70 font-body font-light">
                      Thank you for your purchase. Your order confirmation has been sent to your email.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
