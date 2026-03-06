import React, { useState, useEffect, useRef } from "react";

interface HeaderProps {
  tenantName?: string;
  tenantSlug?: string;
  basePath?: string;
}

const Header: React.FC<HeaderProps> = ({ tenantName = "Hotel1", basePath = "/theme/hotel1" }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const scrollThreshold = 50; // Minimum scroll distance to trigger hide/show
          const topThreshold = 100; // Distance from top to consider "at top"

          // Determine if we're at the top
          setIsAtTop(currentScrollY < topThreshold);

          // Determine if we've scrolled enough to show scrolled state
          setIsScrolled(currentScrollY > 20);

          // Determine visibility based on scroll direction
          if (Math.abs(currentScrollY - lastScrollY.current) < scrollThreshold) {
            // Too small a movement, don't change visibility
            ticking.current = false;
            return;
          }

          if (currentScrollY < topThreshold) {
            // Near top, always show
            setIsVisible(true);
          } else if (currentScrollY > lastScrollY.current) {
            // Scrolling down, hide
            setIsVisible(false);
          } else {
            // Scrolling up, show
            setIsVisible(true);
          }

          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });

        ticking.current = true;
      }
    };

    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Stay", href: `${basePath}` },
    { label: "Rooms", href: `${basePath}/rooms` },
    { label: "Experiences", href: `${basePath}/experiences` },
    { label: "Location", href: `${basePath}/location` },
    { label: "Contact", href: `${basePath}/contact` },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0 pointer-events-none"
      } ${
        isAtTop
          ? "bg-transparent py-5 lg:py-6"
          : "bg-white/95 backdrop-blur-sm py-3 lg:py-3.5 border-b border-brand-neutral/10 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Brand / Logo */}
          <div className="flex-shrink-0">
            <a
              href={basePath}
              className="font-headline text-xl lg:text-2xl font-semibold text-brand-text tracking-[-0.02em] hover:opacity-75 transition-opacity duration-300"
            >
              {tenantName}
            </a>
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center gap-8 xl:gap-12 flex-1 justify-center px-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="font-body text-[13px] tracking-wide text-brand-text/70 hover:text-brand-text transition-all duration-300 relative group py-1"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-brand-primary transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="flex-shrink-0">
            <button className="btn-primary text-sm font-medium px-6 py-2.5 rounded-sm hover:shadow-[0_4px_12px_rgba(36,95,115,0.25)] hover:-translate-y-[1px] transition-all duration-300">
              Book Direct
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden ml-4 p-2 -mr-2 text-brand-text/70 hover:text-brand-text transition-colors duration-300"
            aria-label="Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
