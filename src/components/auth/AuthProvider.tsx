import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback, useRef } from 'react';
import { Tenant } from '../admin/PostgresIntegration';
import { STORAGE_KEYS } from '@/utils/constants';

interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  tenant_id: string | null;
  is_super_admin: boolean;
}

interface AuthContextType {
  user: User | null;
  signIn: (email: string, password: string, themeSlug?: string) => Promise<{ success: boolean; error?: string }>;
  signInWithAccessKey: (accessKey: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => void;
  loading: boolean;
  createAdminUser: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  currentTenantId: string | null;
  handleTenantChange: (tenantId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

function getApiBaseUrl() {
  if (import.meta.env.DEV) return '';

  const raw = String(import.meta.env.VITE_API_BASE_URL || '').trim();
  if (!raw) return ''; // same-origin (recommended on Vercel)

  // If user provided a domain without protocol (e.g. "cms.sparti.ai"), assume https.
  if (!raw.startsWith('http://') && !raw.startsWith('https://')) {
    return `https://${raw}`;
  }

  return raw;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentTenantId, setCurrentTenantId] = useState<string | null>(null);
  // Track if we've set tenant ID from sign-in to prevent resetting on user updates
  const hasSetTenantFromSignIn = useRef<boolean>(false);

  const signOut = useCallback(() => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEYS.USER_SESSION);
    localStorage.removeItem(STORAGE_KEYS.ACCESS_KEY);
    setCurrentTenantId(null);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_TENANT_ID);
    hasSetTenantFromSignIn.current = false;
  }, []);

  useEffect(() => {
    const initializeAuth = async () => {
      setLoading(true);
      let validatedUser: User | null = null;
      const API_BASE_URL = getApiBaseUrl();

      // 1. Verify session with backend or use local data for demo
      const session = localStorage.getItem(STORAGE_KEYS.USER_SESSION);
      if (session) {
        try {
          const sessionData = JSON.parse(session);
          if (sessionData.token) {
            const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${sessionData.token}`,
                'Content-Type': 'application/json',
              },
            });

            if (response.ok) {
              const data = await response.json();
              if (data.success && data.user) {
                validatedUser = {
                  id: data.user.id.toString(),
                  first_name: data.user.first_name,
                  last_name: data.user.last_name,
                  email: data.user.email,
                  role: data.user.role,
                  tenant_id: data.user.tenant_id,
                  is_super_admin: data.user.is_super_admin || false,
                };
                setUser(validatedUser);
              } else {
                signOut(); // Invalid user data from backend
              }
            } else {
              signOut(); // Token is invalid or expired
            }
          } else {
            // No token, assume it's a demo user from createAdminUser. Set user from session.
            validatedUser = sessionData as User;
            setUser(validatedUser);
          }
        } catch (error) {
          console.error('Error processing session data:', error);
          signOut();
        }
      }

      // 2. Determine and set tenant ID
      // Only restore from localStorage on initialization, don't set from user.tenant_id
      // (that should only happen during sign-in)
      let tenantIdToSet: string | null = null;
      const savedTenantId = localStorage.getItem(STORAGE_KEYS.CURRENT_TENANT_ID);
      if (savedTenantId) {
        tenantIdToSet = savedTenantId;
      } else if (validatedUser && validatedUser.tenant_id) {
        // Only set from user.tenant_id if there's no saved value and user is not super admin
        // This handles the case where user refreshes page before signing in
        tenantIdToSet = validatedUser.tenant_id;
        hasSetTenantFromSignIn.current = true;
      }

      // Development fallback: set a default tenant to improve DX
      if (!tenantIdToSet && import.meta.env.DEV) {
        tenantIdToSet = 'tenant-gosg';
        try {
          localStorage.setItem(STORAGE_KEYS.CURRENT_TENANT_ID, tenantIdToSet);
        } catch {}
      }

      setCurrentTenantId(tenantIdToSet);

      setLoading(false);
    };

    initializeAuth();
  }, [signOut]);

  const handleTenantChange = useCallback((tenantId: string) => {
    if (!tenantId || tenantId === '') {
      setCurrentTenantId(null);
      localStorage.removeItem(STORAGE_KEYS.CURRENT_TENANT_ID);
    } else {
      setCurrentTenantId(tenantId);
      localStorage.setItem(STORAGE_KEYS.CURRENT_TENANT_ID, tenantId);
    }
  }, []);

  const signIn = useCallback(async (email: string, password: string, themeSlug?: string): Promise<{ success: boolean; error?: string }> => {
    // Retry logic for network failures
    const maxRetries = 2;
    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        const API_BASE_URL = getApiBaseUrl();
        
        // Include themeSlug in query string if provided (for backend validation)
        const loginUrl = themeSlug
          ? `${API_BASE_URL}/api/auth/login?themeSlug=${encodeURIComponent(themeSlug)}`
          : `${API_BASE_URL}/api/auth/login`;
        
        const response = await fetch(loginUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(currentTenantId ? { 'X-Tenant-Id': currentTenantId } : {})
          },
          body: JSON.stringify({ email, password }),
        });

        // Check if response is ok and has content
        if (!response.ok) {
          // Try to parse error response as JSON
          let errorData: any = {};
          let rawText = '';
          try {
            rawText = await response.text();
            errorData = rawText ? JSON.parse(rawText) : {};
          } catch {
            // ignore JSON parse errors
          }

          // Prefer server-provided messages if available
          let errorMessage =
            errorData.message ||
            errorData.error ||
            `Login failed (${response.status})`;

          if (response.status === 401) {
            errorMessage = 'Invalid email or password.';
          } else if (response.status === 503) {
            errorMessage = errorData.message || 'Database is unavailable. Please try again shortly.';
          } else if (response.status >= 500) {
            // Only override if server did not provide a helpful message.
            if (!errorData.message && !errorData.error) {
              errorMessage = 'Server error. Please try again in a moment.';
            }
          }

          console.error('[testing] Login failed:', errorMessage);
          return { 
            success: false, 
            error: errorMessage
          };
        }

        // Parse response as JSON
        let data;
        try {
          const text = await response.text();
          if (!text) {
            throw new Error('Empty response from server');
          }
          data = JSON.parse(text);
        } catch (parseError) {
          console.error('[testing] Failed to parse login response:', parseError);
          return { 
            success: false, 
            error: 'Invalid response from server. Please try again.' 
          };
        }

        if (data.success && data.user) {
          const userData: User = {
            id: data.user.id.toString(),
            first_name: data.user.first_name,
            last_name: data.user.last_name,
            email: data.user.email,
            role: data.user.role,
            tenant_id: data.user.tenant_id,
            is_super_admin: data.user.is_super_admin || false
          };
          
          setUser(userData);
          localStorage.setItem(STORAGE_KEYS.USER_SESSION, JSON.stringify({ ...userData, token: data.token }));
          
          if (!hasSetTenantFromSignIn.current) {
            const tenantIdToSet = userData.tenant_id && !userData.is_super_admin ? userData.tenant_id : null;
            if (tenantIdToSet) {
              setCurrentTenantId(tenantIdToSet);
              localStorage.setItem(STORAGE_KEYS.CURRENT_TENANT_ID, tenantIdToSet);
              hasSetTenantFromSignIn.current = true;
            }
          }
          
          return { success: true };
        } else {
          // Return the specific error message from the server, or fallback to generic message
          const errorMessage = data.message || data.error || 'Invalid credentials';
          console.error('[testing] Login failed:', errorMessage);
          return { 
            success: false, 
            error: errorMessage
          };
        }
      } catch (error) {
        console.error('[testing] Login error:', error);
        // Check if it's a network error and we have retries left
        if (error instanceof TypeError && error.message.includes('fetch') && attempt < maxRetries) {
          lastError = error;
          await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1))); // Exponential backoff
          continue;
        }
        // Check if it's a JSON parse error
        if (error instanceof SyntaxError && error.message.includes('JSON')) {
          return { 
            success: false, 
            error: 'Invalid response from server. Please try again.' 
          };
        }
        // For other errors or if no retries left, return error
        return { 
          success: false, 
          error: error instanceof Error ? error.message : 'Login failed. Please try again.' 
        };
      }
    }

    // If we exhausted retries, return the last error
    return {
      success: false,
      error: lastError instanceof Error 
        ? `Connection failed after ${maxRetries + 1} attempts: ${lastError.message}`
        : 'Login failed. Please check your connection and try again.'
    };
  }, [currentTenantId]);

  const signInWithAccessKey = useCallback(async (accessKey: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const API_BASE_URL = getApiBaseUrl();
      const response = await fetch(`${API_BASE_URL}/api/auth/verify-access-key?access_key=${encodeURIComponent(accessKey)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.success && data.user) {
        const userData: User = {
          id: data.user.id.toString(),
          first_name: data.user.first_name,
          last_name: data.user.last_name,
          email: data.user.email,
          role: data.user.role,
          tenant_id: data.user.tenant_id,
          is_super_admin: data.user.is_super_admin || false
        };
        
        setUser(userData);
        localStorage.setItem(STORAGE_KEYS.USER_SESSION, JSON.stringify(userData));
        localStorage.setItem(STORAGE_KEYS.ACCESS_KEY, accessKey);
        
        if (!hasSetTenantFromSignIn.current) {
          const tenantIdToSet = userData.tenant_id && !userData.is_super_admin ? userData.tenant_id : null;
          if (tenantIdToSet) {
            setCurrentTenantId(tenantIdToSet);
            localStorage.setItem(STORAGE_KEYS.CURRENT_TENANT_ID, tenantIdToSet);
            hasSetTenantFromSignIn.current = true;
          }
        }
        
        return { success: true };
      } else {
        return { 
          success: false, 
          error: data.error || 'Invalid access key' 
        };
      }
    } catch (error) {
      console.error('Access key login error:', error);
      return { 
        success: false, 
        error: 'Access key verification failed. Please try again.' 
      };
    }
  }, []);

  const createAdminUser = useCallback(async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // Create a demo admin user directly in localStorage for development purposes
      const adminUser: User = {
        id: '1',
        first_name: 'Admin',
        last_name: 'User',
        email: email,
        role: 'admin',
        tenant_id: null,
        is_super_admin: true
      };
      
      localStorage.setItem(STORAGE_KEYS.USER_SESSION, JSON.stringify(adminUser));
      setUser(adminUser);
      localStorage.setItem(STORAGE_KEYS.DEMO_CREDENTIALS, JSON.stringify({ email, password }));
      
      return { success: true };
    } catch (error) {
      console.error('Create admin user error:', error);
      return { 
        success: false, 
        error: 'Failed to create admin user. Please try again.' 
      };
    }
  }, []);

  const value = {
    user,
    signIn,
    signInWithAccessKey,
    signOut,
    loading,
    createAdminUser,
    currentTenantId,
    handleTenantChange,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;