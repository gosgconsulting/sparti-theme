import { useEffect } from 'react';
import { debugLog } from '@/utils/debugLogger';

interface GoogleAnalyticsProps {
  gaId?: string | null;
}

/**
 * Google Analytics component
 * Injects GA4 script in head
 */
export const GoogleAnalytics: React.FC<GoogleAnalyticsProps> = ({ gaId }) => {
  useEffect(() => {
    if (!gaId || !gaId.trim()) return;

    // Check if GA is already loaded
    if (document.querySelector('script[src*="googletagmanager.com/gtag"]')) {
      debugLog('[testing] Google Analytics already loaded, skipping');
      return;
    }

    // Initialize dataLayer
    if (!(window as any).dataLayer) {
      (window as any).dataLayer = [];
    }

    // Inject GA script in head
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${gaId.trim()}`;
    document.head.appendChild(script1);

    // Inject GA configuration script
    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${gaId.trim()}');
    `;
    document.head.appendChild(script2);

    debugLog('[testing] Google Analytics injected:', gaId.trim());

    return () => {
      // Cleanup on unmount (optional, usually not needed for GA)
      script1.remove();
      script2.remove();
    };
  }, [gaId]);

  return null;
};
