import { writable } from 'svelte/store';

interface Organization {
	id: number;
	name: string;
	description: string;
	contactEmail: string;
	contactPhone: string;
	address: string;
}

interface OrganizationState {
	organization: Organization | null;
	loading: boolean;
	error: string | null;
}

function createOrganizationStore() {
	const { subscribe, set, update } = writable<OrganizationState>({
		organization: null,
		loading: false,
		error: null
	});

	return {
		subscribe,
		fetchOrganization: async () => {
			update((state) => ({ ...state, loading: true, error: null }));
			try {
				// Replace this with your actual API call
				const response = await fetch('/api/organization');
				if (!response.ok) throw new Error('Failed to fetch organization data');
				const data = await response.json();
				update((state) => ({ ...state, organization: data, loading: false }));
			} catch (error) {
				update((state) => ({ ...state, error: error.message, loading: false }));
			}
		},
		updateOrganization: async (updatedOrganization: Partial<Organization>) => {
			update((state) => ({ ...state, loading: true, error: null }));
			try {
				// Replace this with your actual API call
				const response = await fetch('/api/organization', {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(updatedOrganization)
				});
				if (!response.ok) throw new Error('Failed to update organization data');
				const data = await response.json();
				update((state) => ({ ...state, organization: data, loading: false }));
			} catch (error) {
				update((state) => ({ ...state, error: error.message, loading: false }));
			}
		},
		setError: (error: string) => {
			update((state) => ({ ...state, error }));
		},
		clearError: () => {
			update((state) => ({ ...state, error: null }));
		},
		reset: () => {
			set({ organization: null, loading: false, error: null });
		}
	};
}

export const organizationStore = createOrganizationStore();
