import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { getTenantId } from "../../../utils/tenantConfig";
import { getApiUrl } from "../../../utils/api";
import type { ComponentSchema } from "../../../types/schema";

interface ContactSectionProps {
  component: ComponentSchema;
  tenantName?: string;
  themeSlug?: string;
}

function getThankYouPath(): string {
  const pathname = window.location.pathname || "/";
  const themeMatch = pathname.match(/^(\/theme\/[\w-]+)/);
  if (themeMatch?.[1]) return `${themeMatch[1]}/thank-you`;
  return "/thank-you";
}

const ContactSection: React.FC<ContactSectionProps> = ({
  component,
  tenantName = "Website",
  themeSlug = "master",
}) => {
  const props = component.props || {};
  const items = component.items || [];

  const getText = (key: string): string => {
    const item = items.find(
      (i) => i.key?.toLowerCase() === key.toLowerCase() && typeof (i as any).content === "string"
    ) as any;
    return item?.content || (props[key] as string) || "";
  };

  const headline = getText("headline") || props.headline as string || "Scale Your Revenue 10x Faster Than In-House";
  const description = getText("description") || "Fill out this form and we will get back to you to understand your business and goals. If we can help, we will develop a free customised growth strategy.";
  const buttonLabel = getText("buttonLabel") || "Get My Free Strategy";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError("Please fill in your name and email.");
      return;
    }
    setError("");
    setIsSubmitting(true);
    try {
      const tenantId = getTenantId();
      const fullMessage = [
        message.trim(),
        website ? `Website: ${website}` : "",
        phone ? `Phone: ${phone}` : "",
      ]
        .filter(Boolean)
        .join("\n");

      const response = await fetch(getApiUrl("/api/form-submissions"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          form_id: "contact-section",
          form_name: `Contact Section - ${tenantName} (${themeSlug})`,
          name,
          email,
          phone: phone || null,
          message: fullMessage || null,
          tenant_id: tenantId,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error((data as any).error || "Failed to submit");
      }

      window.location.href = getThankYouPath();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full bg-transparent border-b border-white/40 text-white placeholder-white/50 " +
    "py-2.5 text-sm focus:outline-none focus:border-white transition-colors";

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-20 sm:py-28"
      style={{ backgroundColor: "var(--brand-primary)" }}
    >
      {/* Decorative blobs */}
      <div
        className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full opacity-20"
        style={{ backgroundColor: "var(--brand-primary-light, white)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-24 left-1/4 h-80 w-80 rounded-full opacity-15"
        style={{ backgroundColor: "var(--brand-primary-light, white)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-16 -right-16 h-[480px] w-[480px] rounded-full opacity-20"
        style={{ backgroundColor: "var(--brand-primary-dark, rgba(0,0,0,0.2))" }}
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left — headline + description */}
          <div className="text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6">
              {headline}
            </h2>
            <p className="text-white/80 leading-relaxed text-base sm:text-lg">
              {description}
            </p>
          </div>

          {/* Right — form */}
          <div>
            <form onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">

                <div>
                  <label className="block text-xs font-semibold text-white/70 uppercase tracking-widest mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    placeholder="Your name"
                    onChange={(e) => setName(e.target.value)}
                    disabled={isSubmitting}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/70 uppercase tracking-widest mb-1">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    placeholder="you@company.com"
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/70 uppercase tracking-widest mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    placeholder="+1 234 567 890"
                    onChange={(e) => setPhone(e.target.value)}
                    disabled={isSubmitting}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/70 uppercase tracking-widest mb-1">
                    Your Website
                  </label>
                  <input
                    type="url"
                    value={website}
                    placeholder="https://yoursite.com"
                    onChange={(e) => setWebsite(e.target.value)}
                    disabled={isSubmitting}
                    className={inputClass}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-white/70 uppercase tracking-widest mb-1">
                    Message
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    placeholder="Tell us about your goals…"
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={isSubmitting}
                    className={
                      "w-full bg-transparent border-b border-white/40 text-white placeholder-white/50 " +
                      "py-2.5 text-sm focus:outline-none focus:border-white transition-colors resize-none"
                    }
                  />
                </div>
              </div>

              {error && (
                <p className="mt-4 text-sm text-white/90 bg-white/10 rounded-lg px-4 py-2">
                  {error}
                </p>
              )}

              <div className="mt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-cta-light gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending…
                    </>
                  ) : (
                    buttonLabel
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
