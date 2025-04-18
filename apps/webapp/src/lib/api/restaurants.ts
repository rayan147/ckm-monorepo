// src/lib/api/restaurants.ts
import type { Restaurant } from '$lib/components/types/models';

// Mock data instead of trying to fetch from actual endpoints
const mockRestaurants: Restaurant[] = [
  {
    id: 1,
    name: 'Downtown Catering',
    imageUrl: null,
    address: '123 Main St',
    city: 'Metropolis',
    zipCode: '12345',
    state: 'NY',
    owner: 'John Smith',
    organizationId: 1,
    foodCost: 2500.75,
    createdAt: '2023-11-10T09:00:00Z',
    updatedAt: '2023-11-10T09:00:00Z',
    isDeleted: false,
    deleted: null
  },
  {
    id: 2,
    name: 'Memorial Hospital Cafeteria',
    imageUrl: null,
    address: '456 Health Ave',
    city: 'Metropolis',
    zipCode: '12345',
    state: 'NY',
    owner: 'Healthcare Services Inc.',
    organizationId: 2,
    foodCost: 3750.50,
    createdAt: '2023-12-05T11:30:00Z',
    updatedAt: '2023-12-05T11:30:00Z',
    isDeleted: false,
    deleted: null
  },
  {
    id: 3,
    name: 'Central High School Cafeteria',
    imageUrl: null,
    address: '789 Education Blvd',
    city: 'Smallville',
    zipCode: '54321',
    state: 'OH',
    owner: 'School District 12',
    organizationId: 3,
    foodCost: 1850.25,
    createdAt: '2024-01-15T08:45:00Z',
    updatedAt: '2024-01-15T08:45:00Z',
    isDeleted: false,
    deleted: null
  },
  {
    id: 4,
    name: 'Wellness Retreat Center',
    imageUrl: null,
    address: '101 Tranquil Lane',
    city: 'Harmony',
    zipCode: '67890',
    state: 'CA',
    owner: 'Golden Years Homes',
    organizationId: 4,
    foodCost: 5200.00,
    createdAt: '2024-02-28T14:15:00Z',
    updatedAt: '2024-02-28T14:15:00Z',
    isDeleted: false,
    deleted: null
  },
  {
    id: 5,
    name: 'Downtown Meal Prep',
    imageUrl: null,
    address: '202 Prep Street',
    city: 'Metropolis',
    zipCode: '12345',
    state: 'NY',
    owner: 'John Smith',
    organizationId: 1,
    foodCost: 1800.50,
    createdAt: '2023-10-20T10:30:00Z',
    updatedAt: '2024-03-15T15:45:00Z',
    isDeleted: true,
    deleted: '2024-03-15T15:45:00Z'
  }
];

export async function fetchRestaurants(organizationId?: number): Promise<Restaurant[]> {
  // Filter by organization ID if provided
  if (organizationId) {
    return mockRestaurants
      .filter(restaurant => restaurant.organizationId === organizationId)
      .map(restaurant => ({ ...restaurant }));
  }

  // Return all restaurants
  return mockRestaurants.map(restaurant => ({ ...restaurant }));
}

export async function getRestaurant(id: number): Promise<Restaurant> {
  const restaurant = mockRestaurants.find(r => r.id === id);

  if (!restaurant) {
    throw new Error(`Restaurant with ID ${id} not found`);
  }

  return { ...restaurant };
}

export async function createRestaurant(restaurant: {
  name: string,
  address: string,
  city: string,
  zipCode: string,
  state: string,
  owner: string,
  organizationId?: number,
  imageUrl?: string
}): Promise<Restaurant> {
  const newId = Math.max(...mockRestaurants.map(r => r.id)) + 1;
  const now = new Date().toISOString();

  const newRestaurant: Restaurant = {
    id: newId,
    ...restaurant,
    imageUrl: restaurant.imageUrl || null,
    foodCost: null,
    createdAt: now,
    updatedAt: now,
    isDeleted: false,
    deleted: null
  };

  // In a real app, this would update the database
  mockRestaurants.push(newRestaurant);

  return { ...newRestaurant };
}

export async function updateRestaurant(id: number, updates: Partial<{
  name: string,
  address: string,
  city: string,
  zipCode: string,
  state: string,
  owner: string,
  organizationId: number,
  imageUrl: string,
  foodCost: number
}>): Promise<Restaurant> {
  const restaurantIndex = mockRestaurants.findIndex(r => r.id === id);

  if (restaurantIndex === -1) {
    throw new Error(`Restaurant with ID ${id} not found`);
  }

  const now = new Date().toISOString();

  // Update the restaurant
  mockRestaurants[restaurantIndex] = {
    ...mockRestaurants[restaurantIndex],
    ...updates,
    updatedAt: now
  };

  return { ...mockRestaurants[restaurantIndex] };
}

export async function deleteRestaurant(id: number): Promise<boolean> {
  const restaurantIndex = mockRestaurants.findIndex(r => r.id === id);

  if (restaurantIndex === -1) {
    throw new Error(`Restaurant with ID ${id} not found`);
  }

  // Remove the restaurant
  mockRestaurants.splice(restaurantIndex, 1);

  return true;
}

export async function archiveRestaurant(id: number): Promise<Restaurant> {
  const restaurantIndex = mockRestaurants.findIndex(r => r.id === id);

  if (restaurantIndex === -1) {
    throw new Error(`Restaurant with ID ${id} not found`);
  }

  const now = new Date().toISOString();

  // Toggle the archive state
  const isDeleted = !mockRestaurants[restaurantIndex].isDeleted;

  // Update the restaurant
  mockRestaurants[restaurantIndex] = {
    ...mockRestaurants[restaurantIndex],
    isDeleted,
    deleted: isDeleted ? now : null,
    updatedAt: now
  };

  return { ...mockRestaurants[restaurantIndex] };
}
