import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/utils/api';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import FlowbiteHeader from '@/libraries/flowbite/components/FlowbiteHeader';
import FlowbiteFooter from '@/libraries/flowbite/components/FlowbiteFooter';

interface Page {
  id: number;
  page_name: string;
  slug: string;
  meta_title: string;
  meta_description: string;
  status: string;
  layout?: any;
}

interface Tenant {
  id: string;
  name: string;
  slug: string;
}

// ----- Fetcher functions (extracted for testability) -----

async function fetchTenant(tenantSlug: string): Promise<Tenant> {
  const response = await api.get(`/api/tenants/by-slug/${tenantSlug}`);
  if (!response.ok) {
    throw new Error(response.status === 404 ? 'Tenant not found' : 'Failed to load tenant information');
  }
  const data = await response.json();
  if (!data.success || !data.data) throw new Error('Invalid tenant data received');
  return data.data as Tenant;
}

async function fetchPage(tenantInfo: Tenant, pageSlug: string): Promise<Page> {
  const normalizedSlug = pageSlug.startsWith('/') ? pageSlug : `/${pageSlug}`;
  const response = await api.get(
    `/api/v1/pages${normalizedSlug}?tenantId=${tenantInfo.id}`,
    { headers: { 'X-Tenant-Id': tenantInfo.id }, tenantId: tenantInfo.id }
  );
  if (!response.ok) {
    throw new Error(response.status === 404 ? 'Page not found' : 'Failed to load page content');
  }
  const data = await response.json();
  if (!data.success || !data.data) throw new Error('Invalid page data received');
  return data.data as Page;
}

// ----- Component -----

/**
 * Client-side React component for tenant sub-pages.
 * Fetches tenant info and page content with React Query for automatic caching.
 */
const TenantPage: React.FC = () => {
  const { tenantSlug, pageSlug } = useParams<{ tenantSlug: string; pageSlug: string }>();

  // Step 1: fetch tenant
  const tenantQuery = useQuery({
    queryKey: ['tenant', tenantSlug],
    queryFn: () => fetchTenant(tenantSlug!),
    enabled: !!tenantSlug && !!pageSlug,
  });

  // Step 2: fetch page (only once tenant is available)
  const pageQuery = useQuery({
    queryKey: ['tenantPage', tenantSlug, pageSlug],
    queryFn: () => fetchPage(tenantQuery.data!, pageSlug!),
    enabled: !!tenantQuery.data && !!pageSlug,
  });

  const ErrorAlert = ({ message }: { message: string }) => (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Alert variant="destructive" className="max-w-md">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </Alert>
    </div>
  );

  if (!tenantSlug || !pageSlug) {
    return <ErrorAlert message="Tenant slug and page slug are required" />;
  }

  if (tenantQuery.isLoading || pageQuery.isLoading) {
    return <div />;
  }

  if (tenantQuery.error) {
    const msg = tenantQuery.error instanceof Error ? tenantQuery.error.message : 'Failed to load tenant';
    return <ErrorAlert message={msg} />;
  }

  if (pageQuery.error) {
    const msg = pageQuery.error instanceof Error ? pageQuery.error.message : 'Failed to load page content';
    return <ErrorAlert message={msg} />;
  }

  const tenant = tenantQuery.data;
  const page = pageQuery.data;

  if (!tenant || !page) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Not Found</AlertTitle>
          <AlertDescription>Page or tenant not found.</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-background">
        <FlowbiteHeader tenantId={tenant.id} />
        <main className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold mb-4">{page.page_name}</h1>
          {page.meta_description && (
            <p className="text-xl text-muted-foreground mb-8">{page.meta_description}</p>
          )}
          {/* TODO: Render page.layout components when layout rendering is implemented */}
          <div className="prose max-w-none">
            <p className="text-muted-foreground">
              Page content will be rendered here. Layout rendering from database is coming soon.
            </p>
          </div>
        </main>
        <FlowbiteFooter tenantId={tenant.id} />
      </div>
    </ErrorBoundary>
  );
};

export default TenantPage;