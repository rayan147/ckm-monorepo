import { writable } from 'svelte/store';

interface KPIState {
	totalRevenue: number;
	revenueGrowth: number;
	totalOrders: number;
	orderGrowth: number;
	totalEmployees: number;
	averageOrderValue: number;
	loading: boolean;
	error: string | null;
}

function createKPIStore() {
	const { subscribe, set, update } = writable<KPIState>({
		totalRevenue: 0,
		revenueGrowth: 0,
		totalOrders: 0,
		orderGrowth: 0,
		totalEmployees: 0,
		averageOrderValue: 0,
		loading: false,
		error: null
	});

	return {
		subscribe,
		fetchKPIs: async () => {
			update((state) => ({ ...state, loading: true, error: null }));
			try {
				// Replace this with your actual API call
				const response = await fetch('/api/kpis');
				if (!response.ok) throw new Error('Failed to fetch KPIs');
				const data = await response.json();
				update((state) => ({
					...state,
					...data,
					loading: false
				}));
			} catch (error) {
				update((state) => ({ ...state, error: error.message, loading: false }));
			}
		}
	};
}

export const kpiStore = createKPIStore();
