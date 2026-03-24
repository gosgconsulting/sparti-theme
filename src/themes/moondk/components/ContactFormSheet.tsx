import { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";
import { debugLog } from "@/utils/debugLogger";

interface ContactFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ContactFormSheet({
  open,
  onOpenChange,
}: ContactFormSheetProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    countryCode: "SG",
    phone: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Ensure body scroll is restored when sheet closes
  useEffect(() => {
    if (!open) {
      // Force remove any potential scroll locks
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }
  }, [open]);

  const handleOpenChange = (newOpen: boolean) => {
    onOpenChange(newOpen);
    // Ensure cleanup when closing
    if (!newOpen) {
      // Small delay to ensure animation completes
      setTimeout(() => {
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
      }, 300);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: Implement form submission logic
    // This could send to an API endpoint or email service
    debugLog("Form submitted:", formData);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      // Reset form
      setFormData({
        fullName: "",
        email: "",
        countryCode: "SG",
        phone: "",
        message: "",
      });
      // Close sheet after successful submission
      handleOpenChange(false);
      // You could add a toast notification here
    }, 1000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent 
        side="right" 
        className="w-full sm:max-w-lg overflow-y-auto bg-background p-0 border-0 [&>button]:hidden flex flex-col h-full max-h-screen"
      >
        {/* Premium Card Container */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* Card with rounded corners and soft shadow */}
          <div className="m-4 sm:m-6 mb-4 sm:mb-6 bg-white rounded-[20px] shadow-[0_4px_24px_rgba(0,0,0,0.08)] flex flex-col relative will-change-transform min-h-fit">
            {/* Custom Close Button */}
            <button
              onClick={() => handleOpenChange(false)}
              className="absolute top-6 right-6 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-card/90 hover:bg-card border border-border text-muted-foreground hover:text-primary transition-all duration-200 hover:scale-105 shadow-sm"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Header Section with more padding */}
            <SheetHeader className="px-8 pt-10 pb-6 border-b border-border">
              <SheetTitle className="text-3xl font-heading tracking-tight text-primary mb-3">
                Contact Us
              </SheetTitle>
              <SheetDescription className="text-sm font-body text-muted-foreground leading-relaxed">
              We’re here to assist you. Share your details and we’ll get back to you as soon as possible.
              </SheetDescription>
            </SheetHeader>

            {/* Form Section with increased padding */}
            <form onSubmit={handleSubmit} className="flex flex-col px-8 py-8 space-y-6">
              <div className="space-y-3">
                <Label 
                  htmlFor="fullName" 
                  className="text-[12px] font-body font-medium text-muted-foreground tracking-[0.05em] uppercase block"
                >
                  Full name
                </Label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="h-11 bg-background border-border rounded-lg text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary transition-all duration-200"
                  placeholder="Your full name"
                />
              </div>

              <div className="space-y-3">
                <Label 
                  htmlFor="email" 
                  className="text-[12px] font-body font-medium text-muted-foreground tracking-[0.05em] uppercase block"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="h-11 bg-background border-border rounded-lg text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary transition-all duration-200"
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="space-y-3">
                <Label 
                  htmlFor="phone" 
                  className="text-[12px] font-body font-medium text-muted-foreground tracking-[0.05em] uppercase block"
                >
                  Phone number
                </Label>
                {/* Unified phone field with seamless connection */}
                <div className="flex gap-0 bg-background border border-border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all duration-200">
                  <Select
                    value={formData.countryCode}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, countryCode: value }))
                    }
                  >
                    <SelectTrigger className="w-20 h-11 border-0 border-r border-border rounded-none bg-transparent focus:ring-0 focus:ring-offset-0 text-foreground">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      <SelectItem value="SG" className="focus:bg-accent">SG</SelectItem>
                      <SelectItem value="US" className="focus:bg-accent">US</SelectItem>
                      <SelectItem value="UK" className="focus:bg-accent">UK</SelectItem>
                      <SelectItem value="KR" className="focus:bg-accent">KR</SelectItem>
                      <SelectItem value="MY" className="focus:bg-accent">MY</SelectItem>
                      <SelectItem value="ID" className="focus:bg-accent">ID</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="flex-1 h-11 border-0 rounded-none bg-transparent text-foreground placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
                    placeholder="1234 5678"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label 
                  htmlFor="message" 
                  className="text-[12px] font-body font-medium text-muted-foreground tracking-[0.05em] uppercase block"
                >
                  Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full min-h-[140px] resize-none bg-background border-border rounded-lg text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary transition-all duration-200"
                  placeholder="How can we help you? Feel free to include any questions or requests."
                />
              </div>

              {/* Green CTA Button with pill shape */}
              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-sm tracking-wide transition-all duration-300 hover:shadow-md hover:shadow-primary/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : "Contact Us"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
