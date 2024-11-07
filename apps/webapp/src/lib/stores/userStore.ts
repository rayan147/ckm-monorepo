import { writable } from 'svelte/store';

interface User {
	id: number;
	name: string;
	email: string;
	role: string;
	// Add other relevant fields
}

interface UserState {
	users: User[];
	loading: boolean;
	error: string | null;
}

function createUserStore() {
	const { subscribe, set, update } = writable<UserState>({
		users: [],
		loading: false,
		error: null
	});

	return {
		subscribe,
		fetchUsers: async () => {
			update((state) => ({ ...state, loading: true, error: null }));
			try {
				// Replace this with your actual API call
				const response = await fetch('/api/users');
				if (!response.ok) throw new Error('Failed to fetch users');
				const data = await response.json();
				update((state) => ({ ...state, users: data, loading: false }));
			} catch (error) {
				update((state) => ({ ...state, error: error.message, loading: false }));
			}
		},
		addUser: async (newUser: Omit<User, 'id'>) => {
			update((state) => ({ ...state, loading: true, error: null }));
			try {
				// Replace this with your actual API call
				const response = await fetch('/api/users', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(newUser)
				});
				if (!response.ok) throw new Error('Failed to add user');
				const addedUser = await response.json();
				update((state) => ({
					...state,
					users: [...state.users, addedUser],
					loading: false
				}));
			} catch (error) {
				update((state) => ({ ...state, error: error.message, loading: false }));
			}
		},
		updateUser: async (updatedUser: User) => {
			update((state) => ({ ...state, loading: true, error: null }));
			try {
				// Replace this with your actual API call
				const response = await fetch(`/api/users/${updatedUser.id}`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(updatedUser)
				});
				if (!response.ok) throw new Error('Failed to update user');
				const updated = await response.json();
				update((state) => ({
					...state,
					users: state.users.map((u) => (u.id === updated.id ? updated : u)),
					loading: false
				}));
			} catch (error) {
				update((state) => ({ ...state, error: error.message, loading: false }));
			}
		},
		deleteUser: async (id: number) => {
			update((state) => ({ ...state, loading: true, error: null }));
			try {
				// Replace this with your actual API call
				const response = await fetch(`/api/users/${id}`, {
					method: 'DELETE'
				});
				if (!response.ok) throw new Error('Failed to delete user');
				update((state) => ({
					...state,
					users: state.users.filter((u) => u.id !== id),
					loading: false
				}));
			} catch (error) {
				update((state) => ({ ...state, error: error.message, loading: false }));
			}
		}
	};
}

export const userStore = createUserStore();
