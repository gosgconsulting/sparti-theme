import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

export interface ProtectedRouteProps {
  /** Content to render when the user is authenticated. */
  children: ReactNode;
  /** Path to redirect to when not authenticated. Defaults to `/admin`. */
  redirectTo?: string;
}

/**
 * Wraps content that requires authentication. Redirects to redirectTo when user is not signed in.
 * Must be used inside AuthProvider and within a React Router context.
 *
 * @param children - Content to render when authenticated
 * @param redirectTo - Path for unauthenticated users (default: '/admin')
 * @returns Renders children when authenticated, otherwise redirects
 */
function ProtectedRoute({ children, redirectTo = '/admin' }: ProtectedRouteProps): React.ReactElement {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '120px' }}>
        Loading…
      </div>
    );
  }

  if (!user) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
