import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// ----- Type Definitions -----

interface BrandingSettings {
  site_name?: string;
  site_tagline?: string;
  site_logo?: string;
  site_favicon?: string;
}

interface ComponentData {
  name: string;
  type: string;
  content: string;
  isPublished?: boolean;
  tenantId?: string;
}

// ----- Fetcher / mutator functions -----

async function apiFetchBranding(): Promise<BrandingSettings> {
  const response = await fetch('/api/branding');
  if (!response.ok) throw new Error(`API request failed: ${response.statusText}`);
  return response.json();
}

async function apiUpdateBranding(settings: Record<string, string>): Promise<void> {
  const response = await fetch('/api/branding', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(settings),
  });
  if (!response.ok) throw new Error(`API request failed: ${response.statusText}`);
}

async function apiGetComponentByName(name: string): Promise<any | null> {
  const res = await fetch(`/api/components?name=${encodeURIComponent(name)}`);
  if (!res.ok) return null;
  const data = await res.json();
  return Array.isArray(data) ? (data[0] ?? null) : data;
}

async function apiUpdateComponent(id: string | number, data: ComponentData): Promise<void> {
  const res = await fetch(`/api/components/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Failed to update component: ${res.statusText}`);
}

async function apiCreateComponent(data: ComponentData): Promise<void> {
  const res = await fetch(`/api/components`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Failed to create component: ${res.statusText}`);
}

// ----- Hooks -----

/**
 * Hook for branding data (read).
 * Returns { branding, loading, error } and a refetch callback.
 */
export const useBranding = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['branding'],
    queryFn: apiFetchBranding,
  });

  return {
    branding: data ?? null,
    loading: isLoading,
    error: error instanceof Error ? error.message : null,
    refetch,
  };
};

/**
 * Hook for updating branding settings (single or multiple keys).
 */
export const useBrandingMutation = () => {
  const qc = useQueryClient();
  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: apiUpdateBranding,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['branding'] }),
  });

  return {
    updateBranding: (key: string, value: string) => mutateAsync({ [key]: value }),
    updateMultipleBranding: (settings: Record<string, string>) => mutateAsync(settings),
    loading: isPending,
    error: error instanceof Error ? error.message : null,
  };
};

/**
 * Hook for fetching a component by name.
 */
export const useComponentByName = (name: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['component', name],
    queryFn: () => apiGetComponentByName(name),
    enabled: !!name,
  });

  return {
    component: data ?? null,
    loading: isLoading,
    error: error instanceof Error ? error.message : null,
  };
};

/**
 * Hook for creating or updating a component.
 */
export const useComponentMutation = () => {
  const qc = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string | number; data: ComponentData }) =>
      apiUpdateComponent(id, data),
    onSuccess: (_data, variables) =>
      qc.invalidateQueries({ queryKey: ['component', variables.data.name] }),
  });

  const createMutation = useMutation({
    mutationFn: (data: ComponentData) => apiCreateComponent(data),
    onSuccess: (_data, variables) =>
      qc.invalidateQueries({ queryKey: ['component', variables.name] }),
  });

  return {
    updateComponent: (id: string | number, data: ComponentData) =>
      updateMutation.mutateAsync({ id, data }),
    createComponent: (data: ComponentData) => createMutation.mutateAsync(data),
    loading: updateMutation.isPending || createMutation.isPending,
    error:
      (updateMutation.error instanceof Error ? updateMutation.error.message : null) ??
      (createMutation.error instanceof Error ? createMutation.error.message : null),
  };
};

/**
 * Legacy compatibility hook — wraps the new hooks into a single object
 * that matches the old `useDatabase()` return shape for any call-sites not
 * yet migrated to the individual hooks above.
 *
 * @deprecated Use the individual hooks instead: useBranding, useBrandingMutation, useComponentByName, useComponentMutation.
 */
const useDatabase = () => {
  const { branding, loading, error } = useBranding();
  const { updateBranding, updateMultipleBranding } = useBrandingMutation();
  const { updateComponent, createComponent } = useComponentMutation();

  return {
    getBranding: async () => {
      // This is a one-off call to get branding; use useBranding hook for reactive data.
      const res = await fetch('/api/branding');
      if (!res.ok) throw new Error(`API request failed: ${res.statusText}`);
      return res.json() as Promise<BrandingSettings>;
    },
    updateBranding,
    updateMultipleBranding,
    loading,
    error,
    status: (loading ? 'loading' : error ? 'error' : 'idle') as 'idle' | 'loading' | 'error',
    components: {
      getByName: apiGetComponentByName,
      update: (id: string | number, data: ComponentData) => updateComponent(id, data),
      create: (data: ComponentData) => createComponent(data),
    },
  };
};

export { useDatabase };
export default useDatabase;