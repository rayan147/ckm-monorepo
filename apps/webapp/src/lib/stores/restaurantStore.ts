import { writable } from 'svelte/store';

interface Restaurant {
  id: number;
  name: string;
  address: string;
  manager: string;
  // Add other relevant fields
}

interface RestaurantState {
  restaurants: Restaurant[];
  loading: boolean;
  error: string | null;
}

function createRestaurantStore() {
  const { subscribe, set, update } = writable<RestaurantState>({
    restaurants: [],
    loading: false,
    error: null
  });

  return {
    subscribe,
    fetchRestaurants: async () => {
      update((state) => ({ ...state, loading: true, error: null }));
      try {
        // Replace this with your actual API call
        const response = await fetch('/api/restaurants');
        if (!response.ok) throw new Error('Failed to fetch restaurants');
        const data = await response.json();
        update((state) => ({ ...state, restaurants: data, loading: false }));
      } catch (error) {
        update((state) => ({ ...state, error: error.message, loading: false }));
      }
    },
    addRestaurant: async (newRestaurant: Omit<Restaurant, 'id'>) => {
      update((state) => ({ ...state, loading: true, error: null }));
      try {
        // Replace this with your actual API call
        const response = await fetch('/api/restaurants', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newRestaurant)
        });
        if (!response.ok) throw new Error('Failed to add restaurant');
        const addedRestaurant = await response.json();
        update((state) => ({
          ...state,
          restaurants: [...state.restaurants, addedRestaurant],
          loading: false
        }));
      } catch (error) {
        update((state) => ({ ...state, error: error.message, loading: false }));
      }
    },
    updateRestaurant: async (updatedRestaurant: Restaurant) => {
      update((state) => ({ ...state, loading: true, error: null }));
      try {
        // Replace this with your actual API call
        const response = await fetch(`/api/restaurants/${updatedRestaurant.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedRestaurant)
        });
        if (!response.ok) throw new Error('Failed to update restaurant');
        const updated = await response.json();
        update((state) => ({
          ...state,
          restaurants: state.restaurants.map((r) => (r.id === updated.id ? updated : r)),
          loading: false
        }));
      } catch (error) {
        update((state) => ({ ...state, error: error.message, loading: false }));
      }
    },
    deleteRestaurant: async (id: number) => {
      update((state) => ({ ...state, loading: true, error: null }));
      try {
        // Replace this with your actual API call
        const response = await fetch(`/api/restaurants/${id}`, {
          method: 'DELETE'
        });
        if (!response.ok) throw new Error('Failed to delete restaurant');
        update((state) => ({
          ...state,
          restaurants: state.restaurants.filter((r) => r.id !== id),
          loading: false
        }));
      } catch (error) {
        update((state) => ({ ...state, error: error.message, loading: false }));
      }
    }
  };
}

export const restaurantStore = createRestaurantStore();
