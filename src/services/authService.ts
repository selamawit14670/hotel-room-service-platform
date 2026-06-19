export interface DecodedToken {
  id: string;
  email: string;
  role: string;
  exp?: number;
}

export interface UserResponse {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: 'KITCHEN' | 'WAITER' | 'SUPERVISOR' | 'ADMIN';
  status: 'ONDUTY' | 'BREAK' | 'OFFLINE';
  createdAt: string;
}

export interface LoginResponse {
  success: boolean;
  token: string;
  user: UserResponse;
}

const TOKEN_KEY = 'rsos_jwt_token';
const USER_KEY = 'rsos_logged_user';

export const AuthService = {
  /**
   * Save authentication payload to localStorage
   */
  setSession(token: string, user: UserResponse) {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  /**
   * Remove authentication payload from localStorage
   */
  clearSession() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  /**
   * Retrieve saved JWT token
   */
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  /**
   * Retrieve saved detailed user payload
   */
  getUser(): UserResponse | null {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },

  /**
   * Checks if user is currently authenticated with a token
   */
  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;
    
    // Check expiration
    const decoded = this.getDecodedToken();
    if (!decoded) return false;
    
    if (decoded.exp) {
      const currentTime = Math.floor(Date.now() / 1000);
      return decoded.exp > currentTime;
    }
    
    return true;
  },

  /**
   * Parse the JWT payload safely to inspect fields
   */
  getDecodedToken(): DecodedToken | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        window
          .atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch {
      return null;
    }
  },

  /**
   * Connect to the backend standard server route to execute login validation
   */
  async login(usernameOrEmail: string, accessCode: string): Promise<LoginResponse> {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          email: usernameOrEmail,
          password: accessCode,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Verification on the dispatched KDS portal failed. Invalid credentials.');
      }

      // Save credentials instantly
      if (data.token && data.user) {
        this.setSession(data.token, data.user);
      }

      return data;
    } catch (error: any) {
      console.error('[AuthService.login] Failure executing HTTP dispatch logic:', error);
      throw error;
    }
  }
};
