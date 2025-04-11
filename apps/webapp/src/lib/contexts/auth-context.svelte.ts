import { zodSchemas, type Auth, type User } from '@ckm/db';
import { getContext, setContext } from 'svelte';

class AuthState {
  user: (User & { auth: Auth[] }) | null = $state(null);
  isAuthenticated: boolean = $state(false);
  isLoading: boolean = $state(false);
  error: string | null = $state(null);

  async initialize() {
    try {
      this.error = null;
      this.isLoading = true;
      const response = await fetch('/api/auth/me');
      if (response.ok) {
        const authUser = await response.json();
        this.user = authUser;
        this.isAuthenticated = true;
        this.isLoading = false;
      } else {
        this.user = null;
        this.isAuthenticated = false;
        this.isLoading = false;
      }
    } catch (error) {
      this.user = null;
      this.isAuthenticated = false;
      this.isLoading = false;
      this.error = error instanceof Error ? error.message : 'Unknown error';
    }
  }

  async clearAuth() {
    try {
      this.user = null;
      this.isAuthenticated = false;
      this.isLoading = false;
      this.error = null;
    } catch (error) {
      this.user = null;
      this.isAuthenticated = false;
      this.isLoading = false;
      this.error = error instanceof Error ? error.message : 'Unknown error';
    }
  }
}

const AUTH_STATE_CONTEXT_KEY = Symbol('auth-state');

export function getAuthConext(): AuthState {
  const existingContext = getContext<AuthState>(AUTH_STATE_CONTEXT_KEY);
  if (existingContext) {
    return existingContext;
  }

  const authState = new AuthState();
  setContext(AUTH_STATE_CONTEXT_KEY, authState);
  return authState;
}
