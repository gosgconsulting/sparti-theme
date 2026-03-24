import { useState } from "react";
import logoSrc from "../../assets/moondk_logo.png";
import { useThemeBasePath } from "@/hooks/useThemeBasePath";
import { themeHref } from "@/components/ThemeLink";
import ContactFormSheet from "../ContactFormSheet";

const Footer = () => {
  const basePath = useThemeBasePath();
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  return (
    <footer className="w-full bg-background text-foreground pt-16 pb-8 px-6 border-t border-border/10 mt-24">
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Brand - Left side */}
          <div>
            <img src={logoSrc} alt="MOONDK" className="mb-6 h-16 w-auto object-contain block" />
            <p className="text-sm font-body font-light text-foreground/70 leading-relaxed max-w-md mb-6">
              Korean home dining, chef-led, curated products. Cook like a chef at home with our premium selection of ingredients, tools, and recipe collections.
            </p>

            {/* Contact Information */}
            <div className="space-y-3 text-sm font-body font-light text-foreground/70">
              <div>
                <p className="font-heading font-medium text-foreground mb-1">Contact</p>
                <p>hello@moondk.com</p>
              </div>
            </div>
          </div>

          {/* Link lists - Right side */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Shop */}
            <div>
              <h4 className="text-sm font-heading font-medium mb-4 text-foreground">Shop</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href={themeHref(basePath, "/#new-arrivals")}
                    className="text-sm font-body font-light text-foreground/70 hover:text-primary transition-colors"
                  >
                    New Arrivals
                  </a>
                </li>
                <li>
                  <a
                    href={themeHref(basePath, "/category/shop")}
                    className="text-sm font-body font-light text-foreground/70 hover:text-primary transition-colors"
                  >
                    All Products
                  </a>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-sm font-heading font-medium mb-4 text-foreground">Support</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href={themeHref(basePath, "/delivery-and-return-policy")}
                    className="text-sm font-body font-light text-foreground/70 hover:text-primary transition-colors"
                  >
                    Delivery and Return Policy
                  </a>
                </li>
                <li>
                  <button
                    onClick={() => setIsContactFormOpen(true)}
                    className="text-sm font-body font-light text-foreground/70 hover:text-primary transition-colors cursor-pointer"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h4 className="text-sm font-heading font-medium mb-4 text-foreground">Connect</h4>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="https://www.instagram.com/beok.sg/?hl=en" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm font-body font-light text-foreground/70 hover:text-primary transition-colors"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm font-body font-light text-foreground/70 hover:text-primary transition-colors">
                    Newsletter
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="border-t border-border/10 pt-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm font-body font-light text-foreground/60 mb-4 md:mb-0">
            © {new Date().getFullYear()} MOONDK. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a
              href={themeHref(basePath, "/privacy-policy")}
              className="text-sm font-body font-light text-foreground/70 hover:text-primary transition-colors"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>

      {/* Contact Form Sheet */}
      <ContactFormSheet
        open={isContactFormOpen}
        onOpenChange={setIsContactFormOpen}
      />
    </footer>
  );
};

export default Footer;