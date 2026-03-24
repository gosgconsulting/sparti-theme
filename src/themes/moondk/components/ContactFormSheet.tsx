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
        className="moondk-theme flex h-full max-h-screen w-full flex-col overflow-y-auto border-0 border-l border-border/25 bg-background px-0 pt-0 pb-[max(2.5rem,env(safe-area-inset-bottom,0px)+1.5rem)] text-foreground shadow-none sm:max-w-lg sm:pb-12 [&>button]:hidden"
      >
        <div className="flex min-h-0 flex-1 flex-col">
          <div className="relative mx-4 mt-4 mb-0 flex min-h-fit flex-col rounded-card bg-card text-card-foreground shadow-lg ring-1 ring-border/20 sm:mx-6 sm:mt-6">
            <button
              type="button"
              onClick={() => handleOpenChange(false)}
              className="absolute top-6 right-6 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-secondary/90 hover:bg-secondary border border-border/30 text-muted-foreground hover:text-primary transition-all duration-200 hover:scale-105 shadow-sm"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            <SheetHeader className="px-8 pt-10 pb-6 border-b border-border/20 text-left">
              <SheetTitle className="text-3xl font-heading tracking-tight text-primary mb-3">
                Contact Us
              </SheetTitle>
              <SheetDescription className="text-sm font-body text-muted-foreground/90 leading-relaxed">
              We’re here to assist you. Share your details and we’ll get back to you as soon as possible.
              </SheetDescription>
            </SheetHeader>

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
                  className="h-11 rounded-lg border-border/40 bg-background text-foreground placeholder:text-muted-foreground/80 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring/25 transition-all duration-200"
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
                  className="h-11 rounded-lg border-border/40 bg-background text-foreground placeholder:text-muted-foreground/80 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring/25 transition-all duration-200"
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
                <div className="flex gap-0 overflow-hidden rounded-lg border border-border/40 bg-background focus-within:border-primary focus-within:ring-2 focus-within:ring-ring/25 transition-all duration-200">
                  <Select
                    value={formData.countryCode}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, countryCode: value }))
                    }
                  >
                    <SelectTrigger className="h-11 w-20 rounded-none border-0 border-r border-border/40 bg-transparent text-foreground focus:ring-0 focus:ring-offset-0">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="moondk-theme border-border/40 bg-popover text-popover-foreground">
                      <SelectItem value="SG" className="focus:bg-accent">
                        SG
                      </SelectItem>
                      <SelectItem value="US" className="focus:bg-accent">
                        US
                      </SelectItem>
                      <SelectItem value="UK" className="focus:bg-accent">
                        UK
                      </SelectItem>
                      <SelectItem value="KR" className="focus:bg-accent">
                        KR
                      </SelectItem>
                      <SelectItem value="MY" className="focus:bg-accent">
                        MY
                      </SelectItem>
                      <SelectItem value="ID" className="focus:bg-accent">
                        ID
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="h-11 flex-1 rounded-none border-0 bg-transparent text-foreground placeholder:text-muted-foreground/80 focus-visible:ring-0 focus-visible:ring-offset-0"
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
                  className="min-h-[140px] w-full resize-none rounded-lg border-border/40 bg-background text-foreground placeholder:text-muted-foreground/80 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring/25 transition-all duration-200"
                  placeholder="How can we help you? Feel free to include any questions or requests."
                />
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-12 w-full rounded-full bg-primary font-medium text-sm tracking-wide text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:shadow-md hover:shadow-primary/15 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
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
