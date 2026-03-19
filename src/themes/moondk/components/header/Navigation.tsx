import { X } from "lucide-react";
import { useEffect, useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";

import { ThemeLink } from "@/components/ThemeLink";
import ShoppingBag from "./ShoppingBag";
import { useCart } from "../../contexts/CartContext";
import ContactFormSheet from "../ContactFormSheet";

import logoSrc from "../../assets/moondk_logo.png";

// Placeholder images - replace with actual product images
import pantheonImage from "../../../e-shop/assets/pantheon.jpg";
import eclipseImage from "../../../e-shop/assets/eclipse.jpg";
import haloImage from "../../../e-shop/assets/halo.jpg";
import foundersImage from "../../../e-shop/assets/founders.png";

const Navigation = () => {
  // Temporarily hide Recipes in header navigation (easy toggle later).
  const SHOW_RECIPES = false;

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [offCanvasType, setOffCanvasType] = useState<"favorites" | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dropdownRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const menuItemRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const searchOverlayRef = useRef<HTMLDivElement>(null);
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  
  const { cartItems, updateQuantity, totalItems, isCartOpen, openCart, closeCart } = useCart();

  // Preload dropdown images for faster display
  useEffect(() => {
    const imagesToPreload = [pantheonImage, eclipseImage, haloImage, foundersImage];

    imagesToPreload.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  // ESC key handler to close dropdown
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeDropdown) {
        setActiveDropdown(null);
      }
    };

    if (activeDropdown) {
      window.addEventListener("keydown", handleEscKey);
      return () => window.removeEventListener("keydown", handleEscKey);
    }
  }, [activeDropdown]);

  // Position dropdown below header
  useEffect(() => {
    if (activeDropdown) {
      const menuItem = menuItemRefs.current.get(activeDropdown);
      const dropdown = dropdownRefs.current.get(activeDropdown);
      const navElement = document.querySelector('nav');
      
      if (menuItem && dropdown && navElement) {
        const updatePosition = () => {
          const navRect = navElement.getBoundingClientRect();
          // Position directly below the entire nav/header (no gap) and align to left edge
          dropdown.style.top = `${navRect.bottom}px`;
          dropdown.style.left = `0px`;
        };
        
        // Use requestAnimationFrame to ensure DOM is ready
        requestAnimationFrame(updatePosition);
        
        // Update on scroll/resize
        window.addEventListener('scroll', updatePosition, true);
        window.addEventListener('resize', updatePosition);
        
        return () => {
          window.removeEventListener('scroll', updatePosition, true);
          window.removeEventListener('resize', updatePosition);
        };
      }
    }
  }, [activeDropdown]);

  // Close search overlay when clicking outside
  useEffect(() => {
    if (isSearchOpen) {
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as Node;
        
        // Check if click is outside search overlay
        if (searchOverlayRef.current && !searchOverlayRef.current.contains(target)) {
          // Check if click is on any search button (desktop or mobile)
          const allSearchButtons = document.querySelectorAll('[aria-label="Search"]');
          let clickedOnSearchButton = false;
          
          allSearchButtons.forEach((button) => {
            if (button.contains(target)) {
              clickedOnSearchButton = true;
            }
          });
          
          // Close search if clicked outside both overlay and buttons
          if (!clickedOnSearchButton) {
            setIsSearchOpen(false);
          }
        }
      };

      // Add event listener with a slight delay to avoid immediate closure
      const timeoutId = setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
      }, 100);

      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isSearchOpen]);

  // Helper function to handle delayed dropdown close
  const handleDropdownClose = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150); // 150ms delay to prevent flicker
  };

  // Helper function to cancel dropdown close
  const handleDropdownOpen = (itemName: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveDropdown(itemName);
  };

  const slugify = useCallback((value: string) => value.toLowerCase().trim().replace(/\s+/g, "-"), []);

  const getSubItemTo = useCallback(
    (itemName: string, itemHref: string, subItem: string) => {
      const slug = slugify(subItem);
      const normalized = itemName.toLowerCase().trim();

      if (normalized === "shop") return `/category/${slug}`;
      if (normalized === "recipes") return `/recipes/${slug}`;

      // Fallback: append to item's base href (avoid double slashes).
      return `${itemHref.replace(/\/$/, "")}/${slug}`;
    },
    [slugify],
  );

  const navItems = [
    {
      name: "Home",
      href: "/",
      submenuItems: [],
      images: [],
    },
    {
      name: "Shop",
      href: "/category/shop",
      submenuItems: [],
      images: [],
    },
    ...(SHOW_RECIPES
      ? [
          {
            name: "Recipes",
            href: "/recipes",
            submenuItems: [],
            images: [],
          },
        ]
      : []),
    {
      name: "Beok Home Dining",
      href: "/beok-private-dinning",
      submenuItems: [],
      images: [],
    },
  ];

  return (
    <nav
      className="relative bg-nav"
      style={{
        backgroundColor: "rgba(242, 242, 242, 0.95)",
        backdropFilter: "blur(10px)",
        zIndex: 40,
      }}
    >
      {/* Topbar */}
      <div
        className="w-full py-2 px-6 flex items-center justify-center text-sm"
        style={{
          backgroundColor: "#B6B8A1", // Updated topbar color
        }}
      >
        <div className="text-[#2F5C3E] font-body font-light">
          FREE DELIVERY FOR ORDERS OVER $150
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white relative">
        <div className="px-6 py-4">
          <div className="mx-auto max-w-6xl">
            {/* Logo, Navigation menus, and Icons aligned horizontally */}
            <div className="flex items-center justify-between w-full">
              {/* Mobile hamburger button */}
              <button
                className="lg:hidden p-2 text-nav-foreground hover:text-primary transition-colors duration-200"
                onClick={() => {
                  const willClose = isMobileMenuOpen;
                  setIsMobileMenuOpen(!isMobileMenuOpen);
                  // Close search overlay when closing mobile menu
                  if (willClose) {
                    setIsSearchOpen(false);
                  }
                }}
                aria-label="Toggle menu"
              >
                <div className="w-5 h-5 relative">
                  <span
                    className={`absolute block w-5 h-px bg-current transform transition-all duration-300 ${
                      isMobileMenuOpen ? "rotate-45 top-2.5" : "top-1.5"
                    }`}
                  ></span>
                  <span
                    className={`absolute block w-5 h-px bg-current transform transition-all duration-300 top-2.5 ${
                      isMobileMenuOpen ? "opacity-0" : "opacity-100"
                    }`}
                  ></span>
                  <span
                    className={`absolute block w-5 h-px bg-current transform transition-all duration-300 ${
                      isMobileMenuOpen ? "-rotate-45 top-2.5" : "top-3.5"
                    }`}
                  ></span>
                </div>
              </button>

              {/* Logo */}
              <div className="flex-shrink-0">
                <ThemeLink to="/" className="block">
                  <img
                    src={logoSrc}
                    alt="MOONDK"
                    className="block h-10 md:h-12 lg:h-14 xl:h-16 w-auto object-contain"
                  />
                </ThemeLink>
              </div>

              {/* Desktop nav items - centered */}
              <div className="hidden lg:flex items-center justify-center flex-1">
                <div className="flex items-center gap-8">
                  {navItems.map((item) => (
                    <div
                      key={item.name}
                      className="relative"
                      ref={(el) => {
                        if (el) menuItemRefs.current.set(item.name, el);
                      }}
                      onMouseEnter={() => {
                        if (item.submenuItems && item.submenuItems.length > 0) {
                          handleDropdownOpen(item.name);
                        } else {
                          setActiveDropdown(null);
                        }
                      }}
                      onMouseLeave={handleDropdownClose}
                    >
                      <ThemeLink
                        to={item.href}
                        className="text-nav-foreground hover:text-primary transition-colors duration-200 text-sm font-body font-light py-2 flex items-center gap-1"
                        aria-expanded={item.submenuItems && item.submenuItems.length > 0 && activeDropdown === item.name}
                      >
                        {item.name}
                        {item.submenuItems && item.submenuItems.length > 0 && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-3 h-3"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m19.5 8.25-7.5 7.5-7.5-7.5"
                            />
                          </svg>
                        )}
                      </ThemeLink>
                      
                      {/* Compact horizontal dropdown below header */}
                      {activeDropdown === item.name && item.submenuItems && item.submenuItems.length > 0 && (
                        <div
                          ref={(el) => {
                            if (el) dropdownRefs.current.set(item.name, el);
                          }}
                          className="fixed z-50 py-4 px-8 transition-all duration-300 ease-out"
                          style={{
                            width: 'max-content',
                            maxWidth: 'min(90vw, 800px)',
                            backgroundColor: '#F2F2F2',
                            borderRadius: '0',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                          }}
                          onMouseEnter={() => handleDropdownOpen(item.name)}
                          onMouseLeave={handleDropdownClose}
                        >
                          <div 
                            className="flex flex-nowrap gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden"
                            style={{
                              scrollbarWidth: 'none',
                              msOverflowStyle: 'none',
                            }}
                          >
                            {item.submenuItems.map((subItem, index) => {
                              const to = getSubItemTo(item.name, item.href, subItem);

                              return (
                                <ThemeLink
                                  key={index}
                                  to={to}
                                  className="rounded-full px-4 py-2 text-sm font-body border transition-colors bg-background text-primary border-primary/30 hover:border-primary/60 hover:bg-primary hover:text-white whitespace-nowrap flex-shrink-0"
                                >
                                  {subItem}
                                </ThemeLink>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  {/* Contact Us button */}
                  <button
                    onClick={() => setIsContactFormOpen(true)}
                    className="text-nav-foreground hover:text-primary transition-colors duration-200 text-sm font-body font-light py-2"
                  >
                    Contact Us
                  </button>
                </div>
              </div>

              {/* Desktop Utility icons - right aligned */}
              <div className="hidden lg:flex items-center space-x-2 flex-shrink-0">
                <button
                  ref={searchButtonRef}
                  className="p-2 text-nav-foreground hover:text-primary transition-colors duration-200"
                  aria-label="Search"
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>
                </button>
                <button
                  className="p-2 text-nav-foreground hover:text-primary transition-colors duration-200"
                  aria-label="Account"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                </button>
                <button
                  className="p-2 text-nav-foreground hover:text-primary transition-colors duration-200 relative"
                  aria-label="Shopping bag"
                  onClick={openCart}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                    />
                  </svg>
                  {totalItems > 0 && (
                    <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[30%] text-[0.5rem] font-semibold text-primary pointer-events-none">
                      {totalItems}
                    </span>
                  )}
                </button>
              </div>

              {/* Mobile Shopping bag - shown on right for mobile only */}
              <button
                className="lg:hidden p-2 ml-auto text-nav-foreground hover:text-primary transition-colors duration-200 relative"
                aria-label="Shopping bag"
                onClick={openCart}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
                {totalItems > 0 && (
                  <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[30%] text-[0.5rem] font-semibold text-primary pointer-events-none">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>


      {/* Search overlay */}
      {isSearchOpen && (
        <div ref={searchOverlayRef} className="absolute top-full left-0 right-0 bg-white border-b border-border z-50">
          <div className="px-6 py-8">
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <div className="flex items-center border-b border-border pb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5 text-nav-foreground mr-3"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search for products..."
                    className="flex-1 bg-transparent text-nav-foreground placeholder:text-nav-foreground/60 outline-none text-lg font-body"
                    autoFocus
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile navigation menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-border z-50">
          <div className="px-6 py-8">
            <div className="space-y-4">
              {navItems.map((item) => (
                <div key={item.name}>
                  <ThemeLink
                    to={item.href}
                    className="text-nav-foreground hover:text-primary transition-colors duration-200 text-lg font-body font-light block py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </ThemeLink>
                  {item.submenuItems && item.submenuItems.length > 0 && (
                    <div className="space-y-1">
                      {item.submenuItems.map((subItem, subIndex) => {
                        const to = getSubItemTo(item.name, item.href, subItem);

                        return (
                          <ThemeLink
                            key={subIndex}
                            to={to}
                            className="text-nav-foreground/70 hover:text-primary text-sm font-body font-light block py-1.5 pl-0"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {subItem}
                          </ThemeLink>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
              {/* Contact Us button for mobile */}
              <button
                onClick={() => {
                  setIsContactFormOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="text-nav-foreground hover:text-primary transition-colors duration-200 text-lg font-body font-light block py-2 w-full text-left"
              >
                Contact Us
              </button>

              {/* Utility icons for mobile */}
              <div className="flex items-center gap-4 pt-4 border-t border-border mt-4">
                <button
                  className="p-2 text-nav-foreground hover:text-primary transition-colors duration-200"
                  aria-label="Search"
                  onClick={() => {
                    setIsSearchOpen(!isSearchOpen);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>
                </button>
                <button
                  className="p-2 text-nav-foreground hover:text-primary transition-colors duration-200"
                  aria-label="Account"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Shopping Bag */}
      <ShoppingBag
        isOpen={isCartOpen}
        onClose={closeCart}
        cartItems={cartItems}
        updateQuantity={updateQuantity}
        onViewFavorites={() => {
          closeCart();
          setOffCanvasType("favorites");
        }}
      />

      {/* Favorites Off-canvas */}
      {offCanvasType === "favorites" && (
        <div className="fixed inset-0 z-50 h-screen">
          <div
            className="absolute inset-0 bg-black/50 h-screen"
            onClick={() => setOffCanvasType(null)}
          />

          <div className="absolute right-0 top-0 h-screen w-96 bg-background border-l border-border animate-slide-in-right flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-lg font-heading font-medium text-foreground">Your Favorites</h2>
              <button
                onClick={() => setOffCanvasType(null)}
                className="p-2 text-foreground hover:text-muted-foreground transition-colors"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              <p className="text-muted-foreground text-sm mb-6 font-body">
                You haven't added any favorites yet. Browse our collection and click the heart icon to save items you love.
              </p>

              {/* Demo actions */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  className="rounded-full"
                  onClick={() => setOffCanvasType(null)}
                >
                  Close
                </Button>
                <Button
                  className="rounded-full bg-primary hover:bg-primary-hover !text-white"
                  onClick={() => {
                    setOffCanvasType(null);
                    openCart();
                  }}
                >
                  View Bag
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Form Sheet */}
      <ContactFormSheet
        open={isContactFormOpen}
        onOpenChange={setIsContactFormOpen}
      />
    </nav>
  );
};

export default Navigation;