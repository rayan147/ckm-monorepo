import { writable } from 'svelte/store';
import { goto } from '$app/navigation';

function createAuth() {
	const { subscribe, set, update } = writable({
		user: null,
		isAuthenticated: false,
		isLoading: true
	});

	return {
		subscribe,
		login: (user: any) => {
			update((n) => ({ ...n, user, isAuthenticated: true, isLoading: false }));
			localStorage.setItem('auth', JSON.stringify({ user, isAuthenticated: true }));
		},
		logout: async () => {
			try {
				const response = await fetch('/api/auth/logout', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					}
				});
				if (response.ok) {
					update((n) => ({ ...n, user: null, isAuthenticated: false, isLoading: false }));
					localStorage.removeItem('auth');
					await goto('/login');
				} else {
					console.error('Logout failed');
				}
			} catch (error) {
				console.error('Logout failed', error);
			}
		},
		init: async () => {
			const stored = localStorage.getItem('auth');
			if (stored) {
				const { user, isAuthenticated } = JSON.parse(stored);
				set({ user, isAuthenticated, isLoading: false });
			} else {
				set({ user: null, isAuthenticated: false, isLoading: false });
			}
		}
	};
}

export const auth = createAuth();
