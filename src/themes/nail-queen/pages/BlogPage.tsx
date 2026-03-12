import { useState, useEffect } from "react";
import { Layout } from "../components/Layout";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getApiUrl } from "../../../utils/api";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  featured_image?: string;
  og_image?: string;
  published_at?: string;
  created_at?: string;
  date?: string;
  categories?: Array<{ id: number; name: string; slug: string }>;
  terms?: Array<{ id: number; name: string; slug: string; taxonomy: string }>;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  post_count?: number;
}

export default function BlogPage({ basePath, tenantId }: { basePath: string; tenantId?: string }) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const postsPerPage = 10;

  const getEffectiveTenantId = () =>
    tenantId ||
    (typeof window !== "undefined" ? (window as any).__CMS_TENANT__ : undefined) ||
    "tenant-nail-queen";

  // Fetch categories with post counts once on mount (or tenant change)
  useEffect(() => {
    const effectiveTenantId = getEffectiveTenantId();
    if (!effectiveTenantId) return;

    let cancelled = false;

    (async () => {
      try {
        const url = getApiUrl(
          `/api/v1/blog/categories?tenantId=${encodeURIComponent(effectiveTenantId)}&withCount=true`
        );
        const res = await fetch(url, { headers: { Accept: "application/json" } });
        if (!res.ok) return;

        const contentType = res.headers.get("content-type") || "";
        if (!contentType.includes("application/json")) return;

        const json = await res.json();
        if (!cancelled && Array.isArray(json?.data)) {
          const sorted = [...json.data].sort(
            (a: Category, b: Category) => (b.post_count || 0) - (a.post_count || 0)
          );
          setCategories(sorted);
        }
      } catch (err) {
        console.error("[blog] Error fetching categories:", err);
      }
    })();

    return () => { cancelled = true; };
  }, [tenantId]);

  // Fetch only the current page of posts whenever page or category changes
  useEffect(() => {
    const effectiveTenantId = getEffectiveTenantId();

    if (!effectiveTenantId) {
      setIsLoading(false);
      setError("Tenant ID not available");
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        setIsLoading(true);
        setError(null);

        const offset = (currentPage - 1) * postsPerPage;
        const params = new URLSearchParams({
          tenantId: effectiveTenantId,
          limit: String(postsPerPage),
          offset: String(offset),
          status: "published",
          order: "published_at DESC",
        });
        if (selectedCategory) {
          params.set("category", selectedCategory);
        }

        const url = getApiUrl(`/api/v1/blog/posts?${params.toString()}`);
        const res = await fetch(url, { headers: { Accept: "application/json" } });

        if (!res.ok) {
          throw new Error(`Failed to fetch posts (${res.status})`);
        }

        const contentType = res.headers.get("content-type") || "";
        if (!contentType.includes("application/json")) {
          throw new Error("Blog is temporarily unavailable. Please try again later.");
        }

        let json: { data?: BlogPost[]; meta?: { total?: number } };
        try {
          json = await res.json();
        } catch {
          throw new Error("Blog is temporarily unavailable. Please try again later.");
        }

        const fetchedPosts: BlogPost[] = Array.isArray(json?.data) ? json.data : [];
        // Prefer explicit total from API
        const apiTotal = json?.meta?.total ?? 0;

        if (!cancelled) {
          setPosts(fetchedPosts);
          setTotalPosts(apiTotal);
        }
      } catch (err: any) {
        if (!cancelled) {
          console.error("[blog] Error fetching blog posts:", err);
          const message =
            err.message?.toLowerCase().includes("json") || err instanceof SyntaxError
              ? "Blog is temporarily unavailable. Please try again later."
              : err.message || "Failed to load blog posts";
          setError(message);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    })();

    return () => { cancelled = true; };
  }, [tenantId, currentPage, selectedCategory]);

  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const handleCategoryChange = (slug: string | null) => {
    setSelectedCategory(slug);
    setCurrentPage(1);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  const getFeaturedImage = (post: BlogPost) => {
    return post.og_image || post.featured_image || "https://images.unsplash.com/photo-1604654894610-df63bc536371?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80";
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      // Show all pages if total is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show first page
      pages.push(1);
      
      if (currentPage > 3) {
        pages.push('...');
      }
      
      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (currentPage < totalPages - 2) {
        pages.push('...');
      }
      
      // Show last page
      pages.push(totalPages);
    }
    
    return pages;
  };

  return (
    <Layout basePath={basePath} tenantId={tenantId}>
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-6xl font-bold text-center text-nail-queen-brown mb-8">Our Blog</h1>
          
          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <button
              onClick={() => handleCategoryChange(null)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === null
                  ? "bg-nail-queen-brown text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All {selectedCategory === null && totalPosts > 0 ? `(${totalPosts})` : ""}
            </button>
            {categories.length > 0 && categories.map((category) => (
              <button
                key={category.slug}
                onClick={() => handleCategoryChange(category.slug)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.slug
                    ? "bg-nail-queen-brown text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {`${category.name} (${category.post_count || 0})`}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading && (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading blog posts...</p>
            </div>
          )}

          {error && !isLoading && (
            <div className="text-center py-12">
              <p className="text-red-600">Error: {error}</p>
            </div>
          )}

          {!isLoading && !error && posts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">No blog posts found{selectedCategory ? ` in this category` : ""}.</p>
            </div>
          )}

          {!isLoading && !error && posts.length > 0 && (
            <>
              <div className="space-y-8 mb-12">
                {posts.map((post) => (
                  <article key={post.id} className="bg-white rounded-lg overflow-hidden shadow-lg">
                    <div className="md:flex">
                      <div className="md:w-1/3">
                        <img
                          src={getFeaturedImage(post)}
                          alt={post.title}
                          className="w-full h-48 md:h-full object-cover"
                        />
                      </div>
                      <div className="md:w-2/3 p-6">
                        <h2 className="text-xl font-bold text-nail-queen-brown mb-3" dangerouslySetInnerHTML={{ __html: post.title }} />
                        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                          {post.excerpt || "No excerpt available."}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">
                            {formatDate(post.published_at || post.created_at || post.date)}
                          </span>
                          <Link
                            to={`${basePath}/blog/${post.slug}`}
                            className="text-nail-queen-brown text-sm font-medium hover:underline"
                          >
                            Read more
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-12">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`p-2 rounded-full transition-colors ${
                      currentPage === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-nail-queen-brown hover:bg-gray-100 border border-gray-200'
                    }`}
                    aria-label="Previous page"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>

                  <div className="flex items-center gap-1">
                    {getPageNumbers().map((page, index) => {
                      if (page === '...') {
                        return (
                          <span key={`ellipsis-${index}`} className="px-2 text-gray-400">
                            ...
                          </span>
                        );
                      }
                      
                      const pageNum = page as number;
                      return (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`min-w-[40px] h-10 px-3 rounded-full text-sm font-medium transition-colors ${
                            currentPage === pageNum
                              ? 'bg-nail-queen-brown text-white'
                              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`p-2 rounded-full transition-colors ${
                      currentPage === totalPages
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-nail-queen-brown hover:bg-gray-100 border border-gray-200'
                    }`}
                    aria-label="Next page"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </Layout>
  );
}
