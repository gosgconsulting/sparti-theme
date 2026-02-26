import { useState, useEffect, useRef } from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import ContactFormSheet from "../components/ContactFormSheet";

// Hook to track active section while scrolling
function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0] || "");

  useEffect(() => {
    const observerOptions: IntersectionObserverInit = {
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    };

    const observers = sectionIds.map((id) => {
      const element = document.getElementById(id);
      if (!element) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        observerOptions
      );

      observer.observe(element);
      return { observer, element };
    });

    return () => {
      observers.forEach((item) => {
        if (item) {
          item.observer.unobserve(item.element);
        }
      });
    };
  }, [sectionIds]);

  return [activeSection, setActiveSection] as const;
}

// Table of Contents component
interface TOCProps {
  items: Array<{ id: string; text: string; number: string }>;
  activeSection: string;
  onSectionChange?: (id: string) => void;
  isMobile?: boolean;
  isOpen?: boolean;
  onToggle?: () => void;
}

function TableOfContents({ items, activeSection, onSectionChange, isMobile, isOpen, onToggle }: TOCProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element && typeof window !== "undefined") {
      // Immediately update active section when clicking
      if (onSectionChange) {
        onSectionChange(id);
      }
      
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      
      // Calculate header height dynamically
      const header = document.querySelector('header, nav[class*="header"], [class*="Header"]');
      const headerHeight = header ? header.getBoundingClientRect().height : 120;
      
      // Get the element's position relative to the document
      const rect = element.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const elementTop = rect.top + scrollTop;
      
      // Account for header height and add spacing
      // scroll-mt-24 is 96px, but we need to account for actual header + spacing
      const offset = headerHeight + 24; // 24px spacing after header
      const targetPosition = elementTop - offset;

      window.scrollTo({
        top: Math.max(0, targetPosition),
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });

      // Update URL without triggering scroll
      window.history.pushState(null, "", `#${id}`);
    }
  };

  if (isMobile) {
    return (
      <nav aria-label="Table of contents" className="mb-8 print:hidden">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-between p-4 bg-white border border-border rounded-lg hover:bg-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#195B3E] focus-visible:ring-offset-2"
          aria-expanded={isOpen}
          aria-controls="toc-content"
        >
          <span className="text-sm font-heading font-medium text-foreground">On this page</span>
          <svg
            className={`w-5 h-5 text-foreground/70 transition-transform ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {isOpen && (
          <div id="toc-content" className="mt-2 p-4 bg-white border border-border rounded-lg">
            <ul className="space-y-2">
              {items.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => handleClick(e, item.id)}
                    className={`block py-2 px-3 text-sm font-body transition-colors rounded ${
                      activeSection === item.id
                        ? "text-[#195B3E] font-medium bg-[#195B3E]/5"
                        : "text-foreground/70 hover:text-[#195B3E] hover:bg-background"
                    } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#195B3E] focus-visible:ring-offset-1`}
                  >
                    <span className="text-foreground/50 mr-2">{item.number}.</span>
                    {item.text.replace(/^\d+\.\s*/, "")}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    );
  }

  return (
    <nav
      aria-label="Table of contents"
      className="sticky top-8 lg:top-48 self-start print:hidden"
      style={{ maxHeight: "calc(100vh - 14rem)" }}
    >
      <div className="p-6 bg-white border border-border rounded-lg">
        <h2 className="text-sm font-heading font-medium text-foreground mb-4">On this page</h2>
        <ul className="space-y-1">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                className={`block py-2 px-3 text-sm font-body transition-colors rounded ${
                  activeSection === item.id
                    ? "text-[#195B3E] font-medium bg-[#195B3E]/5"
                    : "text-foreground/70 hover:text-[#195B3E] hover:bg-background"
                } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#195B3E] focus-visible:ring-offset-1`}
              >
                <span className="text-foreground/50 mr-2">{item.number}.</span>
                {item.text.replace(/^\d+\.\s*/, "")}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default function DeliveryAndReturnPolicyPage() {
  const [isTOCOpen, setIsTOCOpen] = useState(false);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Define sections with their IDs and text
  const sections = [
    { id: "introduction", text: "Introduction", number: "" },
    { id: "delivery", text: "1. Delivery Information", number: "1" },
    { id: "shipping", text: "2. Shipping Options", number: "2" },
    { id: "returns", text: "3. Returns and Refunds", number: "3" },
    { id: "exchanges", text: "4. Exchanges", number: "4" },
    { id: "damaged-items", text: "5. Damaged or Defective Items", number: "5" },
    { id: "contact", text: "6. Contact Us", number: "6" },
  ];

  const sectionIds = sections.map((s) => s.id);
  const [activeSection, setActiveSection] = useActiveSection(sectionIds);
  
  // Handle manual section change from TOC clicks
  const handleSectionChange = (id: string) => {
    setActiveSection(id);
  };

  // Scroll to top handler
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#195B3E] focus:text-white focus:rounded focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#195B3E]"
      >
        Skip to main content
      </a>

      <main id="main-content" className="pt-8 pb-16">
        {/* Hero Header */}
        <div className="bg-background border-b border-border-light">
          <div className="max-w-7xl mx-auto px-6 py-8 md:py-12">
            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-5xl font-heading font-medium !text-[#195B3E] mb-4">
                Delivery and Return Policy
              </h1>
              <p className="text-lg font-body font-light text-foreground/70">
                Information about shipping, delivery, and returns
              </p>
            </div>
          </div>
        </div>

        {/* Content Container */}
        <div className="max-w-7xl mx-auto px-6 py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 lg:gap-12">
            {/* Table of Contents - Mobile */}
            <div className="lg:hidden">
              <TableOfContents
                items={sections.filter((s) => s.number)}
                activeSection={activeSection}
                onSectionChange={handleSectionChange}
                isMobile={true}
                isOpen={isTOCOpen}
                onToggle={() => setIsTOCOpen(!isTOCOpen)}
              />
            </div>

            {/* Table of Contents - Desktop */}
            <div className="hidden lg:block">
              <TableOfContents
                items={sections.filter((s) => s.number)}
                activeSection={activeSection}
                onSectionChange={handleSectionChange}
                isMobile={false}
              />
            </div>

            {/* Main Content */}
            <article ref={contentRef} className="max-w-none">
              <div className="bg-white rounded-lg p-6 md:p-8 lg:p-12 shadow-sm border border-border-light">
                {/* Introduction Section */}
                <section id="introduction" className="mb-12 scroll-mt-24">
                  <div className="prose prose-lg max-w-none">
                    <p className="text-base md:text-lg font-body font-light text-foreground/70 leading-relaxed mb-6">
                      At MoonDk, we are committed to providing you with a seamless shopping experience. This policy outlines our delivery, shipping, and return procedures to ensure transparency and clarity for all our customers.
                    </p>
                    <p className="text-base md:text-lg font-body font-light text-foreground/70 leading-relaxed">
                      Please read this policy carefully before making a purchase. By placing an order with us, you agree to the terms outlined in this policy.
                    </p>
                  </div>
                </section>

                {/* Section 1 */}
                <section id="delivery" className="mb-16 scroll-mt-24 print:break-inside-avoid">
                  <div className="border-b border-border-light pb-6 mb-6">
                    <h2 className="text-2xl md:text-3xl font-heading font-medium !text-[#195B3E] mb-3">
                      1. Delivery Information
                    </h2>
                  </div>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-base font-body font-light text-foreground/70 leading-relaxed mb-4">
                      We offer delivery to various locations. Delivery times may vary depending on your location and the shipping method selected. Standard delivery typically takes 5-7 business days, while express delivery options are available for faster service.
                    </p>
                    <p className="text-base font-body font-light text-foreground/70 leading-relaxed mb-4">
                      Once your order has been processed and shipped, you will receive a confirmation email with tracking information. You can use this tracking number to monitor the status of your delivery.
                    </p>
                    <p className="text-base font-body font-light text-foreground/70 leading-relaxed">
                      Please ensure that someone is available to receive the delivery at the specified address. If no one is available, the delivery may be left in a safe location or returned to our facility, which may result in additional charges.
                    </p>
                  </div>
                  <button
                    onClick={scrollToTop}
                    className="mt-6 text-sm font-body text-foreground/60 hover:text-[#195B3E] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#195B3E] focus-visible:ring-offset-2 focus-visible:rounded px-2 py-1"
                  >
                    ↑ Back to top
                  </button>
                </section>

                {/* Section 2 */}
                <section id="shipping" className="mb-16 scroll-mt-24 print:break-inside-avoid">
                  <div className="border-b border-border-light pb-6 mb-6">
                    <h2 className="text-2xl md:text-3xl font-heading font-medium !text-[#195B3E] mb-3">
                      2. Shipping Options
                    </h2>
                  </div>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-base font-body font-light text-foreground/70 leading-relaxed mb-4">
                      We offer several shipping options to accommodate your needs. Standard shipping is available for all orders, with free delivery for orders over $150. Express shipping options are available for an additional fee and provide faster delivery times.
                    </p>
                    <p className="text-base font-body font-light text-foreground/70 leading-relaxed mb-4">
                      Shipping costs are calculated at checkout based on your delivery address and the selected shipping method. All prices displayed are in the currency of your selected region.
                    </p>
                    <p className="text-base font-body font-light text-foreground/70 leading-relaxed">
                      International shipping may be subject to customs duties and taxes, which are the responsibility of the recipient. We recommend checking with your local customs office for more information.
                    </p>
                  </div>
                  <button
                    onClick={scrollToTop}
                    className="mt-6 text-sm font-body text-foreground/60 hover:text-[#195B3E] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#195B3E] focus-visible:ring-offset-2 focus-visible:rounded px-2 py-1"
                  >
                    ↑ Back to top
                  </button>
                </section>

                {/* Section 3 */}
                <section id="returns" className="mb-16 scroll-mt-24 print:break-inside-avoid">
                  <div className="border-b border-border-light pb-6 mb-6">
                    <h2 className="text-2xl md:text-3xl font-heading font-medium !text-[#195B3E] mb-3">
                      3. Returns and Refunds
                    </h2>
                  </div>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-base font-body font-light text-foreground/70 leading-relaxed mb-4">
                      We want you to be completely satisfied with your purchase. If you are not satisfied, you may return items within 30 days of receipt for a full refund or exchange, provided the items are in their original condition, unused, and in their original packaging.
                    </p>
                    <p className="text-base font-body font-light text-foreground/70 leading-relaxed mb-4">
                      To initiate a return, please contact our customer service team with your order number and the items you wish to return. We will provide you with a return authorization and instructions for returning the items.
                    </p>
                    <p className="text-base font-body font-light text-foreground/70 leading-relaxed mb-4">
                      Refunds will be processed to the original payment method within 5-10 business days after we receive and inspect the returned items. Shipping costs are non-refundable unless the return is due to our error.
                    </p>
                    <p className="text-base font-body font-light text-foreground/70 leading-relaxed">
                      Please note that certain items, such as personalized or custom-made products, may not be eligible for return. These items will be clearly marked at the time of purchase.
                    </p>
                  </div>
                  <button
                    onClick={scrollToTop}
                    className="mt-6 text-sm font-body text-foreground/60 hover:text-[#195B3E] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#195B3E] focus-visible:ring-offset-2 focus-visible:rounded px-2 py-1"
                  >
                    ↑ Back to top
                  </button>
                </section>

                {/* Section 4 */}
                <section id="exchanges" className="mb-16 scroll-mt-24 print:break-inside-avoid">
                  <div className="border-b border-border-light pb-6 mb-6">
                    <h2 className="text-2xl md:text-3xl font-heading font-medium !text-[#195B3E] mb-3">
                      4. Exchanges
                    </h2>
                  </div>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-base font-body font-light text-foreground/70 leading-relaxed mb-4">
                      If you need to exchange an item for a different size, color, or style, please contact us within 30 days of receipt. Exchanges are subject to product availability.
                    </p>
                    <p className="text-base font-body font-light text-foreground/70 leading-relaxed">
                      To process an exchange, you will need to return the original item following our return procedure. Once we receive the returned item, we will ship the replacement item. You will be responsible for return shipping costs unless the exchange is due to our error.
                    </p>
                  </div>
                  <button
                    onClick={scrollToTop}
                    className="mt-6 text-sm font-body text-foreground/60 hover:text-[#195B3E] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#195B3E] focus-visible:ring-offset-2 focus-visible:rounded px-2 py-1"
                  >
                    ↑ Back to top
                  </button>
                </section>

                {/* Section 5 */}
                <section id="damaged-items" className="mb-16 scroll-mt-24 print:break-inside-avoid">
                  <div className="border-b border-border-light pb-6 mb-6">
                    <h2 className="text-2xl md:text-3xl font-heading font-medium !text-[#195B3E] mb-3">
                      5. Damaged or Defective Items
                    </h2>
                  </div>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-base font-body font-light text-foreground/70 leading-relaxed mb-4">
                      If you receive a damaged or defective item, please contact us immediately within 7 days of receipt. We will arrange for a replacement or full refund at no cost to you.
                    </p>
                    <p className="text-base font-body font-light text-foreground/70 leading-relaxed mb-4">
                      Please provide photos of the damaged or defective item when contacting us, as this will help us process your request more quickly. We may request that you return the item for inspection.
                    </p>
                    <p className="text-base font-body font-light text-foreground/70 leading-relaxed">
                      We take quality control seriously and will investigate any reports of damaged or defective items to ensure we maintain our high standards.
                    </p>
                  </div>
                  <button
                    onClick={scrollToTop}
                    className="mt-6 text-sm font-body text-foreground/60 hover:text-[#195B3E] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#195B3E] focus-visible:ring-offset-2 focus-visible:rounded px-2 py-1"
                  >
                    ↑ Back to top
                  </button>
                </section>

                {/* Section 6 */}
                <section id="contact" className="mb-16 scroll-mt-24 print:break-inside-avoid">
                  <div className="border-b border-border-light pb-6 mb-6">
                    <h2 className="text-2xl md:text-3xl font-heading font-medium !text-[#195B3E] mb-3">
                      6. Contact Us
                    </h2>
                  </div>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-base font-body font-light text-foreground/70 leading-relaxed">
                      If you have any questions about our delivery and return policy, or if you need assistance with an order, please contact our customer service team. We are here to help and will respond to your inquiry as soon as possible.
                    </p>
                  </div>
                  <button
                    onClick={scrollToTop}
                    className="mt-6 text-sm font-body text-foreground/60 hover:text-[#195B3E] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#195B3E] focus-visible:ring-offset-2 focus-visible:rounded px-2 py-1"
                  >
                    ↑ Back to top
                  </button>
                </section>

                {/* Questions/Contact Block */}
                <div className="mt-16 pt-8 border-t border-border-light">
                  <div className="bg-background rounded-lg p-6 md:p-8">
                    <h3 className="text-xl font-heading font-medium !text-[#195B3E] mb-3">Questions?</h3>
                    <p className="text-base font-body font-light text-foreground/70 leading-relaxed mb-4">
                      If you have questions about our delivery and return policy, please contact us.
                    </p>
                    <button
                      onClick={() => setIsContactFormOpen(true)}
                      className="inline-flex items-center px-6 py-3 bg-[#195B3E] text-white font-body font-medium rounded-full hover:bg-[#1F3D2A] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#195B3E] focus-visible:ring-offset-2"
                    >
                      Contact Us
                    </button>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </main>

      <Footer />

      {/* Contact Form Sheet */}
      <ContactFormSheet open={isContactFormOpen} onOpenChange={setIsContactFormOpen} />

      {/* Print Styles */}
      <style>{`
        @media print {
          .print\\:hidden {
            display: none !important;
          }
          .print\\:break-inside-avoid {
            break-inside: avoid;
            page-break-inside: avoid;
          }
          body {
            background: white;
          }
          article {
            box-shadow: none;
            border: none;
            padding: 0;
          }
          section {
            margin-bottom: 2rem;
          }
          button {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
