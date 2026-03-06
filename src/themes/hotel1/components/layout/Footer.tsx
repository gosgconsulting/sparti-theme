import React from "react";

interface FooterProps {
  tenantName?: string;
  tenantSlug?: string;
  basePath?: string;
}

const Footer: React.FC<FooterProps> = ({ tenantName = "Hotel1", basePath = "/theme/hotel1" }) => {
  return (
    <footer className="bg-brand-text text-white py-16 lg:py-20 mt-auto">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-3 gap-12 lg:gap-16 mb-12">
          {/* Brand Block */}
          <div className="space-y-4">
            <h3 className="font-headline text-xl text-white">{tenantName}</h3>
            <p className="font-body text-sm text-white/70 leading-relaxed">
              Refined stays, elevated guest experience, premium hospitality.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="font-body text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              Stay
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={`${basePath}/rooms`}
                  className="font-body text-sm text-white/70 hover:text-white transition-colors inline-block hover:underline underline-offset-4"
                >
                  Rooms & Suites
                </a>
              </li>
              <li>
                <a
                  href={`${basePath}/amenities`}
                  className="font-body text-sm text-white/70 hover:text-white transition-colors inline-block hover:underline underline-offset-4"
                >
                  Amenities
                </a>
              </li>
              <li>
                <a
                  href={`${basePath}/experiences`}
                  className="font-body text-sm text-white/70 hover:text-white transition-colors inline-block hover:underline underline-offset-4"
                >
                  Experiences
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Booking */}
          <div>
            <h4 className="font-body text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              Contact
            </h4>
            <ul className="space-y-3 mb-6">
              <li className="font-body text-sm text-white/70">+1 (555) 123-4567</li>
              <li className="font-body text-sm text-white/70">hello@hotel1.com</li>
              <li className="font-body text-sm text-white/70">
                123 Premium Street
                <br />
                City, State 12345
              </li>
            </ul>
            <button className="btn-primary w-full md:w-auto">
              Book Direct
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-sm text-white/60">
            © {new Date().getFullYear()} {tenantName}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href={`${basePath}/privacy`}
              className="font-body text-sm text-white/60 hover:text-white transition-colors hover:underline underline-offset-4"
            >
              Privacy
            </a>
            <a
              href={`${basePath}/terms`}
              className="font-body text-sm text-white/60 hover:text-white transition-colors hover:underline underline-offset-4"
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
