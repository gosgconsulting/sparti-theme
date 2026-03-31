import { useState, useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import { Layout } from "../components/Layout";
import { getApiUrl } from "../../../utils/api";

type Status = "checking" | "redirect" | "notfound";

export default function NotFoundPage({
  basePath,
  path,
  tenantId,
}: {
  basePath: string;
  path?: string;
  tenantId?: string;
}) {
  const [status, setStatus] = useState<Status>("checking");

  // Take the last non-empty segment of the path as the candidate slug
  const slug = path ? path.split("/").filter(Boolean).pop() ?? "" : "";

  useEffect(() => {
    if (!slug) {
      setStatus("notfound");
      return;
    }

    const effectiveTenantId =
      tenantId ||
      (typeof window !== "undefined" ? (window as any).__CMS_TENANT__ : undefined) ||
      "tenant-nail-queen";

    let cancelled = false;

    (async () => {
      try {
        const url = getApiUrl(
          `/api/v1/blog/posts/${encodeURIComponent(slug)}?tenantId=${encodeURIComponent(effectiveTenantId)}`
        );
        const res = await fetch(url, { headers: { Accept: "application/json" } });

        if (!cancelled) {
          if (res.ok) {
            const contentType = res.headers.get("content-type") || "";
            if (contentType.includes("application/json")) {
              const json = await res.json();
              if (json?.data?.slug) {
                setStatus("redirect");
                return;
              }
            }
          }
          setStatus("notfound");
        }
      } catch {
        if (!cancelled) setStatus("notfound");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [slug, tenantId]);

  if (status === "checking") {
    return (
      <Layout basePath={basePath} tenantId={tenantId}>
        <div className="mx-auto w-full min-w-0 max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (status === "redirect") {
    return <Navigate to={`${basePath}/blog/${slug}`} replace />;
  }

  return (
    <Layout basePath={basePath} tenantId={tenantId}>
      <div className="mx-auto w-full min-w-0 max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-lg bg-white p-6 text-center shadow-lg sm:p-8">
          <h1 className="text-4xl font-bold text-nail-queen-brown sm:text-6xl mb-4">404</h1>
          <p className="text-xl text-gray-700 mb-2">Page Not Found</p>
          <p className="text-gray-600 mb-8">
            The page you're looking for doesn't exist.
          </p>
          <Link
            to={basePath}
            className="text-nail-queen-brown text-sm font-medium hover:underline"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </Layout>
  );
}
