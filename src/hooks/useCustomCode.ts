import { useState, useEffect } from 'react';
import { getApiUrl } from '@/utils/api';

export interface CustomCodeSettings {
  head: string;
  body: string;
  gtmId: string;
  gaId: string;
  gscVerification: string;
}

/**
 * Hook to fetch custom code settings from CMS.
 * Use from any theme that needs tenant-specific head/body/analytics code.
 */
export const useCustomCode = (tenantId?: string): {
  customCode: CustomCodeSettings | null;
  loading: boolean;
  error: string | null;
} => {
  const [customCode, setCustomCode] = useState<CustomCodeSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!tenantId) {
      setLoading(false);
      return;
    }

    const fetchCustomCode = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(getApiUrl(`/api/custom-code?tenantId=${encodeURIComponent(tenantId)}`), {
          method: 'GET',
          headers: { Accept: 'application/json' },
        });

        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            setLoading(false);
            return;
          }
          throw new Error(`Failed to fetch custom code: ${response.statusText}`);
        }

        const data = await response.json();
        setCustomCode({
          head: data.head || '',
          body: data.body || '',
          gtmId: data.gtmId || '',
          gaId: data.gaId || '',
          gscVerification: data.gscVerification || '',
        });
      } catch (err) {
        setError(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomCode();
  }, [tenantId]);

  return { customCode, loading, error };
};
