"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { MessageCircle, Camera, FileText, Phone, Loader2, Facebook, X } from "lucide-react";
import { getTenantId } from "../../../utils/tenantConfig";
import { getApiUrl } from "../../../utils/api";

type ContactPanelProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type ContactMethod = "whatsapp" | "instagram" | "form" | "call";

const WHATSAPP_PHONE = "6597916789";
const INSTAGRAM_URL = "https://www.instagram.com/nailqueen_bymichelletran/";
const FACEBOOK_URL = "https://www.facebook.com/nailqueenfep";

function getThankYouPath(): string {
  const pathname = window.location.pathname || "/";

  // Theme mode: /theme/{slug}/...
  const themeMatch = pathname.match(/^(\/theme\/[\w-]+)/);
  if (themeMatch?.[1]) {
    return `${themeMatch[1]}/thank-you`;
  }

  // Standalone mode
  return "/thank-you";
}

const ContactPanel: React.FC<ContactPanelProps> = ({ open, onOpenChange }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedMethod, setSelectedMethod] = useState<ContactMethod | null>(null);

  // Step 2 fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Step 3
  const [message, setMessage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Reset form when closing
  useEffect(() => {
    if (!open) {
      setStep(1);
      setSelectedMethod(null);
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setSubmitStatus("idle");
      setErrorMessage("");
    }
  }, [open]);

  // Disable background scrolling while panel is open
  useEffect(() => {
    if (open) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [open]);

  const canGoNextFromStep1 = useMemo(() => {
    return selectedMethod === "form";
  }, [selectedMethod]);

  const canGoNextFromStep2 = useMemo(() => {
    return name.trim().length > 0 && email.trim().length > 0;
  }, [name, email]);

  // Prefill the message when entering step 3
  useEffect(() => {
    if (step === 3 && message.trim().length === 0) {
      const safeName = name.trim() || "";
      const prefill = safeName ? `Hello, I am ${safeName}.\n\n` : "Hello,\n\n";
      setMessage(prefill);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  const goNext = () => {
    if (step === 1) {
      if (!canGoNextFromStep1) {
        setSubmitStatus("error");
        setErrorMessage("Please choose a contact method.");
        return;
      }
      setSubmitStatus("idle");
      setErrorMessage("");
      setStep(2);
      return;
    }
    if (step === 2) {
      if (!canGoNextFromStep2) {
        setSubmitStatus("error");
        setErrorMessage("Please fill in your name and email.");
        return;
      }
      setSubmitStatus("idle");
      setErrorMessage("");
      setStep(3);
      return;
    }
  };

  const goBack = () => {
    if (step === 2) setStep(1);
    if (step === 3) setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedMethod !== "form") {
      return;
    }

    if (!canGoNextFromStep2) {
      setSubmitStatus("error");
      setErrorMessage("Please fill in your name and email.");
      setStep(2);
      return;
    }

    if (message.trim().length === 0) {
      setSubmitStatus("error");
      setErrorMessage("Please enter your message.");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const tenantId = getTenantId();
      const finalMessage = `${message.trim()}\n\nPreferred contact method: Email`;

      // Submit form data to API – use getApiUrl for static/Vercel deploy
      const response = await fetch(getApiUrl("/api/form-submissions"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          form_id: 92,//"nail-queen-contact-form",
          form_name: "Contact Form - Nail Queen",
          name,
          email,
          phone: phone || null,
          company: null,
          message: finalMessage,
          tenant_id: tenantId,
        }),
      });

      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ error: "Failed to submit form" }));
        throw new Error(errorData.error || "Failed to submit form");
      }

      const thankYouPath = getThankYouPath();
      // Normal thank-you flow for email
      onOpenChange(false);
      window.location.href = thankYouPath;
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Failed to submit form. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className={cn(
          /* Mobile: inset-0 ties the panel to the viewport (fixes width > 100% quirks). Do not use overflow-x on this node — it clips the absolute close control. */
          "fixed z-[60] flex min-h-0 flex-col border-l border-black/5 bg-white",
          "box-border max-md:inset-0 max-md:h-dvh max-md:max-h-dvh max-md:w-auto max-md:min-w-0",
          "sm:inset-y-0 sm:right-0 sm:left-auto sm:h-screen sm:max-h-screen sm:w-[460px] sm:max-w-[460px]",
          "overflow-y-auto overflow-x-visible overscroll-contain shadow-[inset_10px_0_30px_-20px_rgba(0,0,0,0.35)]",
          "p-4 pt-12 pb-6 pr-11 sm:p-6 sm:pr-6 sm:pt-6",
          "data-[state=open]:animate-in data-[state=open]:slide-in-from-right data-[state=open]:duration-300",
          "data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=closed]:duration-300",
          "ease-in-out",
          /* Hide shadcn’s default close (direct child <button>) — we render a visible X inside the scroll layer */
          "[&>button:last-child]:hidden"
        )}
      >
        <div className="relative flex min-h-0 min-w-0 w-full max-w-full flex-1 flex-col overflow-x-hidden">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className={cn(
              "absolute right-0 top-0 z-[120] flex h-11 w-11 shrink-0 items-center justify-center rounded-md text-gray-700",
              "hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2"
            )}
            aria-label="Close contact form"
          >
            <X className="h-5 w-5" aria-hidden={true} />
          </button>
          <SheetHeader className="mt-0 shrink-0 pr-12 text-left sm:mt-8 sm:pr-0">
            <SheetTitle className="text-xl font-semibold">Contact us</SheetTitle>
            <SheetDescription className="break-words text-left text-sm text-gray-600">
              Tell us about your goals — we'll tailor the scope after a quick consultation.
            </SheetDescription>
          </SheetHeader>

          <form onSubmit={handleSubmit} className="mt-6 w-full min-w-0 max-w-full space-y-6">
          {/* Step 1 */}
          {step === 1 && (
            <div className="min-w-0 max-w-full space-y-4">
              <h3 className="break-words text-lg font-medium">1. How would you like to contact us?</h3>
              <p className="break-words text-sm text-gray-600">Choose one option, then continue.</p>

              <div className="flex min-w-0 max-w-full flex-col items-stretch space-y-3 text-left">
                {/* WhatsApp */}
                <button
                  type="button"
                  onClick={() => {
                    const thankYouPath = getThankYouPath();
                    const params = new URLSearchParams({
                      via: "whatsapp",
                      phone: WHATSAPP_PHONE,
                    });
                    onOpenChange(false);
                    window.location.href = `${thankYouPath}?${params.toString()}`;
                  }}
                  aria-pressed={false}
                  className={cn(
                    "box-border flex w-full max-w-full min-w-0 shrink-0 self-stretch items-center justify-start rounded-xl border p-4 text-left transition-colors hover:bg-gray-50"
                  )}
                >
                  <div className="flex min-w-0 max-w-full flex-1 items-center gap-3">
                    <MessageCircle className="h-5 w-5 shrink-0 text-green-600" />
                    <div className="min-w-0">
                      <div className="font-medium">WhatsApp</div>
                      <div className="text-xs text-gray-600">Fastest reply</div>
                    </div>
                  </div>
                </button>

                {/* Instagram */}
                <button
                  type="button"
                  onClick={() => {
                    const thankYouPath = getThankYouPath();
                    const params = new URLSearchParams({
                      via: "instagram",
                    });
                    onOpenChange(false);
                    window.location.href = `${thankYouPath}?${params.toString()}`;
                  }}
                  aria-pressed={false}
                  className={cn(
                    "box-border flex w-full max-w-full min-w-0 shrink-0 self-stretch items-center justify-start rounded-xl border p-4 text-left transition-colors hover:bg-gray-50"
                  )}
                >
                  <div className="flex min-w-0 max-w-full flex-1 items-center gap-3">
                    <Camera className="h-5 w-5 shrink-0 text-pink-500" />
                    <div className="min-w-0">
                      <div className="font-medium">Instagram</div>
                      <div className="text-xs text-gray-600">DM us on Instagram</div>
                    </div>
                  </div>
                </button>

                {/* Facebook */}
                <button
                  type="button"
                  onClick={() => {
                    const thankYouPath = getThankYouPath();
                    const params = new URLSearchParams({
                      via: "facebook",
                    });
                    onOpenChange(false);
                    window.location.href = `${thankYouPath}?${params.toString()}`;
                  }}
                  aria-pressed={false}
                  className={cn(
                    "box-border flex w-full max-w-full min-w-0 shrink-0 self-stretch items-center justify-start rounded-xl border p-4 text-left transition-colors hover:bg-gray-50"
                  )}
                >
                  <div className="flex min-w-0 max-w-full flex-1 items-center gap-3">
                    <Facebook className="h-5 w-5 shrink-0 text-blue-600" />
                    <div className="min-w-0">
                      <div className="font-medium">Facebook</div>
                      <div className="text-xs text-gray-600">Visit our Facebook page</div>
                    </div>
                  </div>
                </button>

                {/* Contact form */}
                <button
                  type="button"
                  onClick={() => setSelectedMethod("form")}
                  aria-pressed={selectedMethod === "form"}
                  className={cn(
                    "box-border flex w-full max-w-full min-w-0 shrink-0 self-stretch items-center justify-start rounded-xl border p-4 text-left transition-colors hover:bg-gray-50"
                  )}
                >
                  <div className="flex min-w-0 max-w-full flex-1 items-center gap-3">
                    <FileText className="h-5 w-5 shrink-0 text-gray-900" />
                    <div className="min-w-0">
                      <div className="font-medium">Contact form</div>
                      <div className="text-xs text-gray-600">Email follow-up</div>
                    </div>
                  </div>
                </button>

                {/* Call */}
                <button
                  type="button"
                  onClick={() => {
                    const thankYouPath = getThankYouPath();
                    const params = new URLSearchParams({
                      via: "call",
                      phone: WHATSAPP_PHONE,
                    });
                    onOpenChange(false);
                    window.location.href = `${thankYouPath}?${params.toString()}`;
                  }}
                  aria-pressed={false}
                  className={cn(
                    "box-border flex w-full max-w-full min-w-0 shrink-0 self-stretch items-center justify-start rounded-xl border p-4 text-left transition-colors hover:bg-gray-50"
                  )}
                >
                  <div className="flex min-w-0 max-w-full flex-1 items-center gap-3">
                    <Phone className="h-5 w-5 shrink-0 text-blue-600" />
                    <div className="min-w-0">
                      <div className="font-medium">Call</div>
                      <div className="text-xs text-gray-600">Speak to us directly</div>
                    </div>
                  </div>
                </button>
              </div>

              {submitStatus === "error" && errorMessage && (
                <div className="min-w-0 max-w-full break-words rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
                  <p className="font-medium">Error</p>
                  <p className="mt-1 text-red-600">{errorMessage}</p>
                </div>
              )}

              {selectedMethod === "form" && (
                <div className="flex w-full min-w-0 gap-2 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    disabled
                    className="min-w-0 flex-1 opacity-60"
                  >
                    Back
                  </Button>
                  <Button
                    type="button"
                    onClick={goNext}
                    disabled={!canGoNextFromStep1}
                    className="min-w-0 flex-1"
                  >
                    Next
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div className="min-w-0 max-w-full space-y-4">
              <h3 className="break-words text-lg font-medium">2. Your details</h3>
              <p className="break-words text-sm text-gray-600">Name and email are required.</p>

              <div className="min-w-0 max-w-full space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-800 mb-2">
                    Name *
                  </label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isSubmitting}
                    className="h-11 max-w-full rounded-xl bg-white focus-visible:ring-2 focus-visible:ring-nail-queen-brown/20"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-800 mb-2">
                    Email *
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting}
                    className="h-11 max-w-full rounded-xl bg-white focus-visible:ring-2 focus-visible:ring-nail-queen-brown/20"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-800 mb-2">
                    Phone (optional)
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+65 1234 5678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    disabled={isSubmitting}
                    className="h-11 max-w-full rounded-xl bg-white focus-visible:ring-2 focus-visible:ring-nail-queen-brown/20"
                  />
                </div>
              </div>

              {submitStatus === "error" && errorMessage && (
                <div className="min-w-0 max-w-full break-words rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
                  <p className="font-medium">Error</p>
                  <p className="mt-1 text-red-600">{errorMessage}</p>
                </div>
              )}

              <div className="flex w-full min-w-0 gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={goBack}
                  className="min-w-0 flex-1"
                >
                  Back
                </Button>
                <Button
                  type="button"
                  onClick={goNext}
                  disabled={!canGoNextFromStep2}
                  className="min-w-0 flex-1"
                >
                  Next
                </Button>
              </div>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div className="min-w-0 max-w-full space-y-4">
              <h3 className="break-words text-lg font-medium">3. Tell us about your request</h3>
              <p className="break-words text-sm text-gray-600">
                We'll save your enquiry and show a confirmation page.
              </p>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-800 mb-2">
                  Your message *
                </label>
                <Textarea
                  id="message"
                  rows={6}
                  placeholder="Describe what you need help with..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={isSubmitting}
                  className="min-w-0 max-w-full rounded-xl bg-white focus-visible:ring-2 focus-visible:ring-nail-queen-brown/20"
                />
              </div>

              {submitStatus === "error" && errorMessage && (
                <div className="min-w-0 max-w-full break-words rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
                  <p className="font-medium">Error</p>
                  <p className="mt-1 text-red-600">{errorMessage}</p>
                </div>
              )}

              <div className="flex w-full min-w-0 gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={goBack}
                  className="min-w-0 flex-1"
                  disabled={isSubmitting}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="min-w-0 flex-1"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Submit"
                  )}
                </Button>
              </div>
            </div>
          )}
        </form>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ContactPanel;