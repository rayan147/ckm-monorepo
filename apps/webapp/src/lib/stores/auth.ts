import { writable, derived } from 'svelte/store';
import { zodSchemas, type Auth, type User } from '@ckm/db';

// User auth state type
export type AuthState = {
  user: (User & { auth: Auth[] }) | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null
};

const createAuthStore = () => {
  const { subscribe, set, update } = writable<AuthState>(initialState);

  return {
    subscribe,

    initialize: async () => {
      update((state) => ({ ...state, isLoading: true, error: null }));

      try {
        const response = await fetch('/api/auth/me');

        if (response.ok) {
          const userData = await response.json();
          update((state) => ({
            ...state,
            user: userData,
            isAuthenticated: true,
            isLoading: false
          }));
        } else {
          update((state) => ({
            ...state,
            user: null,
            isAuthenticated: false,
            isLoading: false
          }));
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        update((state) => ({
          ...state,
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        }));
      }
    },

    setUser: (user: (User & { auth: Auth[] }) | null) => {
      update((state) => ({
        ...state,
        user,
        isAuthenticated: !!user,
        isLoading: false
      }));
    },

    setError: (error: string | null) => {
      update((state) => ({ ...state, error }));
    },

    clearAuth: () => {
      update((state) => ({
        ...state,
        user: null,
        isAuthenticated: false
      }));
    }
  };
};

export const authStore = createAuthStore();
// Derived store for just checking if user is authenticated
export const isAuthenticated = derived(authStore, ($auth) => $auth.isAuthenticated);
const priorityOrder: zodSchemas.UserRoleType[] = ['ADMIN', 'MANAGER', 'CHEF', 'STAFF'] as const;

export const userRole = derived(authStore, ($auth) => {
  if (!$auth.user || !$auth.user.auth || $auth.user.auth.length === 0) {
    return null;
  }

  return [...$auth.user.auth].sort(
    (a, b) => priorityOrder.indexOf(a.role) - priorityOrder.indexOf(b.role)
  )[0].role;
});
