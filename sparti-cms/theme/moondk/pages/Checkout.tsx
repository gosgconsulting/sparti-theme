import { useMemo, useState } from "react";
import { Check, CreditCard, Minus, Plus } from "lucide-react";

import Footer from "../components/footer/Footer";
import CheckoutHeader from "../components/header/CheckoutHeader";
import { useCart } from "../contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

export default function CheckoutPage() {
  const { cartItems, updateQuantity, clearCart } = useCart();
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
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);

  const subtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => {
      const price = parseFloat(item.price.replace("$", "").replace(",", ""));
      return sum + price * item.quantity;
    }, 0);
  }, [cartItems]);

  const getShippingCost = () => {
    switch (shippingOption) {
      case "express":
        return 35;
      case "standard":
        return subtotal >= 150 ? 0 : 15;
      case "self-pickup":
        return 0;
      default:
        return subtotal >= 150 ? 0 : 15;
    }
  };

  const shipping = getShippingCost();
  const total = subtotal + shipping;
  const freeShippingThreshold = 150;
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handleDiscountSubmit = () => {
    console.log("Discount code submitted:", discountCode);
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
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setPaymentComplete(true);
    // Clear cart only after successful order completion
    clearCart();
  };

  return (
    <div className="min-h-screen bg-background">
      <CheckoutHeader />

      <main className="pt-6 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Summary */}
            <div className="lg:col-span-1 lg:order-2">
              <div className="bg-[#F2EFDC] p-8 rounded-card sticky top-6">
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
                              className="h-8 w-8 p-0 rounded-full border-border-light"
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
                              className="h-8 w-8 p-0 rounded-full border-border-light"
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

                <div className="mt-8 pt-6 border-t border-border-light">
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
                          className="flex-1 rounded-card"
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

                <div className="border-t border-border-light mt-4 pt-6">
                  <div className="flex justify-between text-sm font-body font-light mb-4">
                    <span className="text-foreground/70">Subtotal</span>
                    <span className="text-foreground">${subtotal.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                  
                  {subtotal < freeShippingThreshold && (
                    <div className="mt-4 p-4 bg-white rounded-lg border-2 border-[#2F5C3E]/20">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-body font-medium text-foreground">
                          Free Standard Shipping
                        </p>
                        <span className="text-xs font-body font-light text-foreground/60">
                          ${subtotal.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} / ${freeShippingThreshold}
                        </span>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="w-full h-2 bg-[#E8E6E0] rounded-full overflow-hidden mb-3">
                        <div 
                          className="h-full bg-[#2F5C3E] transition-all duration-300 ease-out rounded-full"
                          style={{ 
                            width: `${Math.min((subtotal / freeShippingThreshold) * 100, 100)}%` 
                          }}
                        />
                      </div>
                      
                      <p className="text-sm font-body font-light text-foreground text-center">
                        Add <span className="font-medium text-[#2F5C3E]">${amountNeededForFreeShipping.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span> more to get free standard shipping
                      </p>
                    </div>
                  )}
                  
                  {subtotal >= freeShippingThreshold && (
                    <div className="mt-4 p-4 bg-[#2F5C3E]/5 rounded-lg border-2 border-[#2F5C3E]/30">
                      <div className="flex items-center justify-center gap-2">
                        <svg 
                          className="w-5 h-5 text-[#2F5C3E]" 
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
                        <p className="text-sm font-body font-medium text-[#2F5C3E]">
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
              <div className="bg-white p-8 rounded-card border border-border-light">
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
                      className="mt-2 rounded-card"
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
                        className="mt-2 rounded-card"
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
                        className="mt-2 rounded-card"
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
                      className="mt-2 rounded-card"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div className="border-t border-border-light pt-6 mt-8">
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
                          className="mt-2 rounded-card"
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
                            className="mt-2 rounded-card bg-muted/50 cursor-not-allowed"
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
                            className="mt-2 rounded-card"
                            placeholder="e.g., 238801"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-border-light pt-6 mt-8">
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
                          className="mt-2 rounded-card"
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
                            className="mt-2 rounded-card"
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
                            className="mt-2 rounded-card"
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
                          className="mt-2 rounded-card"
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
                          className="mt-2 rounded-card"
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
                            className="mt-2 rounded-card bg-muted/50 cursor-not-allowed"
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
                            className="mt-2 rounded-card"
                            placeholder="e.g., 238801"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white p-8 rounded-card border border-border-light">
                <h2 className="text-lg font-heading font-medium text-foreground mb-6">Shipping Options</h2>

                <RadioGroup value={shippingOption} onValueChange={setShippingOption} className="space-y-4">
                  <Label
                    htmlFor="standard"
                    className={`flex items-center justify-between p-4 border rounded-card cursor-pointer transition-all duration-200 ${
                      shippingOption === "standard"
                        ? "border-[#2F5C3E] bg-[#2F5C3E]/5"
                        : "border-border-light hover:border-[#2F5C3E]/30 hover:bg-[#F2EFDC]/30"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="standard" id="standard" />
                      <span className="font-body font-light text-foreground">
                        Standard Shipping
                      </span>
                    </div>
                    <div className="text-sm font-body font-light text-foreground/70">
                      {subtotal >= 150 ? "Free" : "$15"} • 3-5 business days
                    </div>
                  </Label>

                  <Label
                    htmlFor="express"
                    className={`flex items-center justify-between p-4 border rounded-card cursor-pointer transition-all duration-200 ${
                      shippingOption === "express"
                        ? "border-[#2F5C3E] bg-[#2F5C3E]/5"
                        : "border-border-light hover:border-[#2F5C3E]/30 hover:bg-[#F2EFDC]/30"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="express" id="express" />
                      <span className="font-body font-light text-foreground">
                        Express Shipping
                      </span>
                    </div>
                    <div className="text-sm font-body font-light text-foreground/70">$35 • 1-2 business days</div>
                  </Label>

                  <Label
                    htmlFor="self-pickup"
                    className={`flex items-center justify-between p-4 border rounded-card cursor-pointer transition-all duration-200 ${
                      shippingOption === "self-pickup"
                        ? "border-[#2F5C3E] bg-[#2F5C3E]/5"
                        : "border-border-light hover:border-[#2F5C3E]/30 hover:bg-[#F2EFDC]/30"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="self-pickup" id="self-pickup" />
                      <span className="font-body font-light text-foreground">
                        Self Pickup
                      </span>
                    </div>
                    <div className="text-sm font-body font-light text-foreground/70">Free • Pickup available immediately</div>
                  </Label>
                </RadioGroup>

                {/* Conditional fields for Standard and Express Shipping */}
                {(shippingOption === "standard" || shippingOption === "express") && (
                  <div className="mt-6 pt-6 border-t border-border-light space-y-6">
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
                        className="mt-2 rounded-card min-h-[100px] resize-none"
                        placeholder="Please provide any additional delivery instructions or information..."
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-white p-8 rounded-card border border-border-light">
                <h2 className="text-lg font-heading font-medium text-foreground mb-6">Payment Details</h2>

                {!paymentComplete ? (
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="cardholderName" className="text-sm font-body font-light text-foreground">
                        Cardholder Name *
                      </Label>
                      <Input
                        id="cardholderName"
                        type="text"
                        value={paymentDetails.cardholderName}
                        onChange={(e) => handlePaymentDetailsChange("cardholderName", e.target.value)}
                        className="mt-2 rounded-card"
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
                          className="rounded-card pl-10"
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
                          className="mt-2 rounded-card"
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
                          className="mt-2 rounded-card"
                          placeholder="123"
                          maxLength={3}
                        />
                      </div>
                    </div>

                    <div className="bg-[#F2EFDC] p-6 rounded-card border border-border-light space-y-3">
                      <div className="flex justify-between text-sm font-body font-light">
                        <span className="text-foreground/70">Subtotal</span>
                        <span className="text-foreground">${subtotal.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                      </div>
                      <div className="flex justify-between text-sm font-body font-light">
                        <span className="text-foreground/70">
                          {shippingOption === "self-pickup" ? "Self Pickup" : "Shipping"}
                        </span>
                        <span className="text-foreground">
                          {shipping === 0 ? "Free" : `$${shipping}`}
                        </span>
                      </div>
                      <div className="flex justify-between text-lg font-heading font-medium border-t border-border-light pt-3">
                        <span className="text-foreground">Total</span>
                        <span className="text-foreground">${total.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                      </div>
                    </div>

                    <Button
                      onClick={handleCompleteOrder}
                      disabled={
                        isProcessing ||
                        !paymentDetails.cardNumber ||
                        !paymentDetails.expiryDate ||
                        !paymentDetails.cvv ||
                        !paymentDetails.cardholderName ||
                        cartItems.length === 0
                      }
                      className="w-full rounded-full h-12 text-base bg-primary hover:bg-primary-hover text-white font-body font-medium"
                    >
                      {isProcessing ? "Processing..." : `Complete Order • $${total.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
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
