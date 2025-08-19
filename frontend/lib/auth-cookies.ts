// lib/auth-cookies.ts
const TOKEN_NAME = 'auth-token';
const REFRESH_TOKEN_NAME = 'refresh-token';

// Unified token management that works on both client and server
export const tokenManager = {
  setToken: (token: string) => {
    if (typeof window !== 'undefined') {
      // Use consistent token name for both localStorage and cookies
      localStorage.setItem(TOKEN_NAME, token);
      
      // Also set a non-httpOnly cookie for easier access (less secure but functional)
      const maxAge = 7 * 24 * 60 * 60; // 7 days
      const secure = window.location.protocol === 'https:' ? '; secure' : '';
      document.cookie = `${TOKEN_NAME}=${token}; path=/; max-age=${maxAge}; samesite=strict${secure}`;
      
      // Store in legacy location for compatibility
      localStorage.setItem('authToken', token);
    }
  },

  getToken: (): string | null => {
    if (typeof window !== 'undefined') {
      // Try consistent token name first
      let token = localStorage.getItem(TOKEN_NAME);
      if (token) return token;
      
      // Try legacy location
      token = localStorage.getItem('authToken');
      if (token) return token;
      
      // Fallback to cookie
      const match = document.cookie.match(new RegExp('(^| )' + TOKEN_NAME + '=([^;]+)'));
      return match ? match[2] : null;
    }
    return null;
  },

  removeToken: () => {
    if (typeof window !== 'undefined') {
      // Remove from all possible locations
      localStorage.removeItem(TOKEN_NAME);
      localStorage.removeItem('authToken');
      localStorage.removeItem('auth_token'); // Legacy compatibility
      document.cookie = `${TOKEN_NAME}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      document.cookie = `${REFRESH_TOKEN_NAME}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    }
  },

  // Server-side token extraction from cookies (for middleware)
  getServerToken: (cookieHeader: string | null): string | null => {
    if (!cookieHeader) return null;
    
    const match = cookieHeader.match(new RegExp('(^|;\\s*)' + TOKEN_NAME + '=([^;]+)'));
    return match ? match[2] : null;
  }
};
