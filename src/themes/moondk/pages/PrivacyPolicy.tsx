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

export default function PrivacyPolicyPage() {
  const [isTOCOpen, setIsTOCOpen] = useState(false);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Define sections with their IDs and text
  const sections = [
    { id: "introduction", text: "Introduction", number: "" },
    { id: "information-collection", text: "1. Information That We Collect From You", number: "1" },
    { id: "use-of-information", text: "2. Use Of Your Information", number: "2" },
    { id: "disclosure", text: "3. Disclosure Of Your Information", number: "3" },
    { id: "security", text: "4. Security And Data Retention", number: "4" },
    { id: "accessing", text: "5. Accessing And Updating", number: "5" },
    { id: "changes", text: "6. Changes To Our Privacy Policy", number: "6" },
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
                Privacy Policy
              </h1>
              <p className="text-lg font-body font-light text-foreground/70">
                How we collect, use, and protect your information
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
                      MoonDk ("we", "our", or "MoonDk") is committed to protecting the privacy of all visitors to our website (http://moondk.com/) and all visitors who access our website or services through any mobile application (together, "Website"). Please read the following privacy policy which explains how we use and protect your information.
                    </p>
                    <p className="text-base md:text-lg font-body font-light text-foreground/70 leading-relaxed">
                      By visiting and/or ordering services on this Website, you agree and where required you consent to the collection, use and transfer of your information as set out in this policy.
                    </p>
                  </div>
                </section>

                {/* Section 1 */}
                <section id="information-collection" className="mb-16 scroll-mt-24 print:break-inside-avoid">
                  <div className="border-b border-border-light pb-6 mb-6">
                    <h2 className="text-2xl md:text-3xl font-heading font-medium !text-[#195B3E] mb-3">
                      1. Information That We Collect From You
                    </h2>
                  </div>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-base font-body font-light text-foreground/70 leading-relaxed mb-4">
                      When you visit the Website or make a MoonDk order through the Website, you may be asked to provide information about yourself including your name and contact details. We may also collect information about your usage of the Website and information about you from the messages you post to the Website and the e-mails or letters you send to us.
                    </p>
                    <p className="text-base font-body font-light text-foreground/70 leading-relaxed">
                      By accessing MoonDk information and/or services using mobile digital routes such as (but not limited to) mobile, tablet or other devices/technology including mobile applications, then you should expect that MoonDk's data collection and usage as set out in this privacy policy will apply in that context too. We may collect technical information from your mobile device or your use of our services through a mobile device, for example, location data and certain characteristics of, and performance data about your device, carrier/operating system including device and connection type, IP address, mobile payment methods, interaction with other retail technology such as use of NFC Tags, QR Codes or use of mobile vouchers. Unless you have elected to remain anonymous through your device and/or platform settings, this information may be collected and used by us automatically if you use the service through your mobile device(s) via any MoonDk mobile application, through your mobile's browser or otherwise.
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
                <section id="use-of-information" className="mb-16 scroll-mt-24 print:break-inside-avoid">
                  <div className="border-b border-border-light pb-6 mb-6">
                    <h2 className="text-2xl md:text-3xl font-heading font-medium !text-[#195B3E] mb-3">
                      2. Use Of Your Information
                    </h2>
                  </div>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-base font-body font-light text-foreground/70 leading-relaxed mb-4">
                      Your information will enable us to provide you with access to the relevant parts of the Website and to supply the services you have requested. It will also enable us to bill you and to contact you where necessary concerning our services. We will also use and analyse the information we collect so that we can administer, support, improve and develop our business, for any other purpose whether statistical or analytical and to help us prevent fraud. Where appropriate, now and in the future you may have the ability to express your preferences around the use of your data as set out in this privacy policy and this may be exercised though your chosen method of using our services, for example mobile, mobile applications or any representation of our Website.
                    </p>
                    <p className="text-base font-body font-light text-foreground/70 leading-relaxed mb-4">
                      We may use your information to contact you for your views on our services and to notify you occasionally about important changes or developments to the Website or our services.
                    </p>
                    <p className="text-base font-body font-light text-foreground/70 leading-relaxed mb-4">
                      You agree that we may use your information to let you know about our other products and services that may be of interest to you including services that may be the subject of direct marketing and we may contact you to do so by post, telephone, mobile messaging (e.g. SMS, MMS etc.) as well as by e-mail. Where you have chosen at a device level to begin or continue receiving push notifications from us, we may send you push notifications relating to the services that you have requested from us and information about our services and offers. You can choose to stop receiving marketing push notifications from us at any time by changing your preferences on your mobile device or by contacting us (see Contact).
                    </p>
                    <p className="text-base font-body font-light text-foreground/70 leading-relaxed mb-4">
                      If you do not want us to use your data in this way or change your mind about being contacted in the future, please let us know by using the contact details set out below and/or amending your profile accordingly.
                    </p>
                    <p className="text-base font-body font-light text-foreground/70 leading-relaxed">
                      Please note that by submitting comments and feedback regarding the Website and the services, you consent to us to use such comments and feedback on the Website and in any marketing or advertising materials. We will only identify you for this purpose by your first name and the city in which you reside.
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
                <section id="disclosure" className="mb-16 scroll-mt-24 print:break-inside-avoid">
                  <div className="border-b border-border-light pb-6 mb-6">
                    <h2 className="text-2xl md:text-3xl font-heading font-medium !text-[#195B3E] mb-3">
                      3. Disclosure Of Your Information
                    </h2>
                  </div>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-base font-body font-light text-foreground/70 leading-relaxed mb-4">
                      The information you provide to us will be transferred to and stored on our servers.
                    </p>
                    <p className="text-base font-body font-light text-foreground/70 leading-relaxed mb-4">
                      Third parties process information such as credit card payments and provide support services related to payments for us. Third parties also help us analyse the information we collect so that we can administer, support, improve and develop our business and services to you. By submitting your personal data, you agree to this transfer, storing or processing. MoonDk will take all steps reasonably necessary to ensure that your data is treated securely and in accordance with this privacy policy.
                    </p>
                    <p className="text-base font-body font-light text-foreground/70 leading-relaxed mb-4">
                      You agree that we may allow carefully selected third parties, including marketing and advertising companies, our affiliates and associates, to contact you occasionally about services that may be of interest to you. They may contact you by telephone, SMS as well as by e-mail. If you change your mind about being contacted by these companies in the future, please let us know by using the contact details set out below and/or by amending your profile accordingly.
                    </p>
                    <p className="text-base font-body font-light text-foreground/70 leading-relaxed mb-4">
                      If our business enters into a joint venture with, purchases or is sold to or merged with another business entity, your information may be disclosed or transferred to the target company, our new business partners or owners or their advisors.
                    </p>
                    <p className="text-base font-body font-light text-foreground/70 leading-relaxed">
                      We may use the information that you provide to us if we are under a duty to disclose or share your information in order to comply with (and/or where we believe we are under a duty to comply with) any legal obligation; or in order to enforce our Website Terms and any other agreement; or to protect the rights of MoonDk or others. This includes exchanging information with other companies and other organisations for the purposes of fraud protection and prevention.
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
                <section id="security" className="mb-16 scroll-mt-24 print:break-inside-avoid">
                  <div className="border-b border-border-light pb-6 mb-6">
                    <h2 className="text-2xl md:text-3xl font-heading font-medium !text-[#195B3E] mb-3">
                      4. Security And Data Retention
                    </h2>
                  </div>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-base font-body font-light text-foreground/70 leading-relaxed mb-4">
                      We take steps to protect your information from unauthorised access and against unlawful processing, accidental loss, destruction and damage. We will keep your information for a reasonable period or as long as the law requires.
                    </p>
                    <p className="text-base font-body font-light text-foreground/70 leading-relaxed mb-4">
                      Where you have chosen a password which allows you to access certain parts of the Website, you are responsible for keeping this password confidential. We advise you not to share your password with anyone.
                    </p>
                    <p className="text-base font-body font-light text-foreground/70 leading-relaxed">
                      Unfortunately, the transmission of information via the internet is not completely secure. Although we will take steps to protect your information, we cannot guarantee the security of your data transmitted to the Website; any transmission is at your own risk. Once we have received your information, we will use strict procedures and security features to try to prevent unauthorised access.
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
                <section id="accessing" className="mb-16 scroll-mt-24 print:break-inside-avoid">
                  <div className="border-b border-border-light pb-6 mb-6">
                    <h2 className="text-2xl md:text-3xl font-heading font-medium !text-[#195B3E] mb-3">
                      5. Accessing And Updating
                    </h2>
                  </div>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-base font-body font-light text-foreground/70 leading-relaxed">
                      You have the right to see the information we hold about you ("Access Request") and to ask us to make any changes to ensure that it is accurate and up to date, as well as to request for data deletion.
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
                <section id="changes" className="mb-16 scroll-mt-24 print:break-inside-avoid">
                  <div className="border-b border-border-light pb-6 mb-6">
                    <h2 className="text-2xl md:text-3xl font-heading font-medium !text-[#195B3E] mb-3">
                      6. Changes To Our Privacy Policy
                    </h2>
                  </div>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-base font-body font-light text-foreground/70 leading-relaxed">
                      Any changes to our Privacy Policy will be posted to the Website and, where appropriate, through e-mail notification.
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
                      If you have questions about this Privacy Policy, please contact us.
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
