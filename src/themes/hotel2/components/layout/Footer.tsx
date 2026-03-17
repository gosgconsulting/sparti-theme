import React from "react";

interface FooterProps {
  tenantName?: string;
  tenantSlug?: string;
  basePath?: string;
}

const Footer: React.FC<FooterProps> = ({ tenantName = "Hotel2", basePath = "/theme/hotel2" }) => {
  return (
    <footer className="mt-auto border-t border-black/10 bg-brand-main py-16 lg:py-20">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-3 gap-12 lg:gap-16 mb-12">
          <div className="space-y-4">
            <h3 className="font-headline text-xl text-black">{tenantName}</h3>
            <p className="font-body text-sm text-brand-dark/80 leading-relaxed">
              Modern urban hospitality—curated stays, refined service, and a calm editorial rhythm.
            </p>
          </div>

          <div>
            <h4 className="font-body text-sm font-semibold text-black mb-4 uppercase tracking-wider">
              Stay
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={`${basePath}/rooms`}
                  className="font-body text-sm text-brand-dark/80 hover:text-black transition-colors inline-block hover:underline underline-offset-4"
                >
                  Rooms & Suites
                </a>
              </li>
              <li>
                <a
                  href={`${basePath}/experiences`}
                  className="font-body text-sm text-brand-dark/80 hover:text-black transition-colors inline-block hover:underline underline-offset-4"
                >
                  Experiences
                </a>
              </li>
              <li>
                <a
                  href={`${basePath}/location`}
                  className="font-body text-sm text-brand-dark/80 hover:text-black transition-colors inline-block hover:underline underline-offset-4"
                >
                  Location
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-body text-sm font-semibold text-black mb-4 uppercase tracking-wider">
              Contact
            </h4>
            <ul className="space-y-3 mb-6">
              <li className="font-body text-sm text-brand-dark/80">+1 (555) 123-4567</li>
              <li className="font-body text-sm text-brand-dark/80">hello@hotel2.com</li>
              <li className="font-body text-sm text-brand-dark/80">
                123 Studio Street
                <br />
                City, State 12345
              </li>
            </ul>
            <button type="button" className="btn-primary w-full md:w-auto">
              Book Direct
            </button>
          </div>
        </div>

        <div className="pt-12 border-t border-black/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-sm text-brand-muted">
            © {new Date().getFullYear()} {tenantName}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href={`${basePath}/privacy`}
              className="font-body text-sm text-brand-muted hover:text-black transition-colors hover:underline underline-offset-4"
            >
              Privacy
            </a>
            <a
              href={`${basePath}/terms`}
              className="font-body text-sm text-brand-muted hover:text-black transition-colors hover:underline underline-offset-4"
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

