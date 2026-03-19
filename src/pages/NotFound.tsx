import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ThemeLink } from "@/components/ThemeLink";

/**
 * Shared 404 page. Uses ThemeLink so "Back to Home" resolves to theme base path
 * when rendered inside a theme, or "/" when used by the router catch-all.
 */
const NotFound = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", pathname);
  }, [pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-foreground mb-2">404</h1>
        <p className="text-lg text-muted-foreground mb-6">Page not found</p>
        <ThemeLink
          to="/"
          className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
        >
          Return to Home
        </ThemeLink>
      </div>
    </div>
  );
};

export default NotFound;
