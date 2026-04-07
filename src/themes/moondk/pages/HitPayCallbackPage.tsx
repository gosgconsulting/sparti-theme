import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";

import CheckoutHeader from "../components/header/CheckoutHeader";
import Footer from "../components/footer/Footer";
import { useCart } from "../contexts/CartContext";
import { isMoondkMedusaEnabled, pollMoondkMedusaCartToOrder } from "../lib/medusa";
import { Button } from "@/components/ui/button";
import { ThemeLink } from "@/components/ThemeLink";

type Phase = "confirming" | "success" | "error" | "no_cart";

export default function HitPayCallbackPage() {
  const medusaMode = isMoondkMedusaEnabled();
  const { medusaCartId, clearCart } = useCart();
  const mounted = useRef(true);
  const clearRef = useRef(clearCart);
  clearRef.current = clearCart;
  const [phase, setPhase] = useState<Phase>("confirming");
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    let ignore = false;

    if (!medusaMode) {
      setPhase("error");
      setMessage("Store checkout is not configured.");
      return () => {
        ignore = true;
      };
    }

    if (!medusaCartId) {
      setPhase("no_cart");
      return () => {
        ignore = true;
      };
    }

    setPhase("confirming");
    setMessage(null);

    void (async () => {
      const out = await pollMoondkMedusaCartToOrder(medusaCartId);
      if (ignore || !mounted.current) return;
      if (out.ok) {
        setPhase("success");
        await clearRef.current();
        return;
      }
      setPhase("error");
      setMessage(out.message);
    })();

    return () => {
      ignore = true;
    };
  }, [medusaMode, medusaCartId]);

  return (
    <div className="min-h-screen bg-background">
      <CheckoutHeader />
      <main className="max-w-lg mx-auto px-6 pt-16 pb-24">
        {phase === "confirming" && (
          <p className="text-sm font-body text-foreground/80" role="status" aria-live="polite">
            Confirming your payment with the store. This usually takes a few seconds.
          </p>
        )}

        {phase === "success" && (
          <div className="text-center py-8">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-xl font-heading font-medium text-foreground mb-2">Order complete</h1>
            <p className="text-foreground/70 font-body font-light text-sm mb-8">
              Thank you for your purchase. A confirmation email is on its way.
            </p>
            <Button asChild className="rounded-full">
              <ThemeLink to="/">Back to home</ThemeLink>
            </Button>
          </div>
        )}

        {phase === "no_cart" && (
          <div className="space-y-4">
            <p className="text-sm font-body text-foreground/80">
              There is no active cart. If you already completed payment, check your email for confirmation.
            </p>
            <Button asChild variant="outline" className="rounded-full">
              <ThemeLink to="/">Back to home</ThemeLink>
            </Button>
            <Button asChild variant="ghost" className="rounded-full block">
              <ThemeLink to="/checkout">Return to checkout</ThemeLink>
            </Button>
          </div>
        )}

        {phase === "error" && (
          <div className="space-y-4">
            <p className="text-sm text-destructive font-body" role="alert">
              {message ?? "We could not confirm your order."}
            </p>
            <Button asChild variant="outline" className="rounded-full">
              <ThemeLink to="/checkout">Back to checkout</ThemeLink>
            </Button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
