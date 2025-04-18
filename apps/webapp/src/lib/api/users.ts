// src/lib/api/users.ts
import type { User } from '$lib/components/types/models';

// Mock data instead of trying to fetch from actual endpoints
const mockUsers: User[] = [
  {
    id: 1,
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    profileImage: null,
    organizationId: 1,
    restaurantId: 1,
    createdAt: '2023-10-15T09:30:00Z',
    updatedAt: '2023-10-15T09:30:00Z'
  },
  {
    id: 2,
    email: 'jane.smith@example.com',
    firstName: 'Jane',
    lastName: 'Smith',
    profileImage: null,
    organizationId: 2,
    restaurantId: 2,
    createdAt: '2023-11-20T14:45:00Z',
    updatedAt: '2023-11-20T14:45:00Z'
  },
  {
    id: 3,
    email: 'alex.johnson@example.com',
    firstName: 'Alex',
    lastName: 'Johnson',
    profileImage: null,
    organizationId: 3,
    restaurantId: 3,
    createdAt: '2024-01-10T11:15:00Z',
    updatedAt: '2024-01-10T11:15:00Z'
  },
  {
    id: 4,
    email: 'sarah.williams@example.com',
    firstName: 'Sarah',
    lastName: 'Williams',
    profileImage: null,
    organizationId: 4,
    restaurantId: 4,
    createdAt: '2024-02-05T16:20:00Z',
    updatedAt: '2024-02-05T16:20:00Z'
  },
  {
    id: 5,
    email: 'michael.brown@example.com',
    firstName: 'Michael',
    lastName: 'Brown',
    profileImage: null,
    organizationId: 1,
    restaurantId: null,
    createdAt: '2024-03-12T13:10:00Z',
    updatedAt: '2024-03-12T13:10:00Z'
  },
  {
    id: 6,
    email: 'lisa.taylor@example.com',
    firstName: 'Lisa',
    lastName: 'Taylor',
    profileImage: null,
    organizationId: null,
    restaurantId: null,
    createdAt: '2024-03-20T10:05:00Z',
    updatedAt: '2024-03-20T10:05:00Z'
  },
  {
    id: 7,
    email: 'david.wilson@example.com',
    firstName: 'David',
    lastName: 'Wilson',
    profileImage: null,
    organizationId: null,
    restaurantId: null,
    createdAt: '2024-03-25T15:30:00Z',
    updatedAt: '2024-03-25T15:30:00Z'
  }
];

export async function fetchUsers(filters?: {
  organizationId?: number,
  restaurantId?: number,
  unassigned?: boolean
}): Promise<User[]> {
  // Apply filters
  let filteredUsers = [...mockUsers];

  if (filters) {
    if (filters.organizationId !== undefined) {
      filteredUsers = filteredUsers.filter(user => user.organizationId === filters.organizationId);
    }

    if (filters.restaurantId !== undefined) {
      filteredUsers = filteredUsers.filter(user => user.restaurantId === filters.restaurantId);
    }

    if (filters.unassigned) {
      filteredUsers = filteredUsers.filter(user =>
        user.organizationId === null && user.restaurantId === null
      );
    }
  }

  // Return deep copies to avoid unintended mutation
  return filteredUsers.map(user => ({ ...user }));
}

export async function getUser(id: number): Promise<User> {
  const user = mockUsers.find(u => u.id === id);

  if (!user) {
    throw new Error(`User with ID ${id} not found`);
  }

  return { ...user };
}

export async function createUser(user: {
  email: string,
  firstName: string,
  lastName: string,
  profileImage?: string,
  organizationId?: number,
  restaurantId?: number
}): Promise<User> {
  const newId = Math.max(...mockUsers.map(u => u.id)) + 1;
  const now = new Date().toISOString();

  const newUser: User = {
    id: newId,
    ...user,
    profileImage: user.profileImage || null,
    organizationId: user.organizationId || null,
    restaurantId: user.restaurantId || null,
    createdAt: now,
    updatedAt: now
  };

  // In a real app, this would update the database
  mockUsers.push(newUser);

  return { ...newUser };
}

export async function updateUser(id: number, updates: Partial<{
  email: string,
  firstName: string,
  lastName: string,
  profileImage: string,
  organizationId: number | null,
  restaurantId: number | null
}>): Promise<User> {
  const userIndex = mockUsers.findIndex(u => u.id === id);

  if (userIndex === -1) {
    throw new Error(`User with ID ${id} not found`);
  }

  const now = new Date().toISOString();

  // Update the user
  mockUsers[userIndex] = {
    ...mockUsers[userIndex],
    ...updates,
    updatedAt: now
  };

  return { ...mockUsers[userIndex] };
}

export async function assignUserToOrganization(userId: number, organizationId: number): Promise<User> {
  // Reuse the updateUser function
  return updateUser(userId, { organizationId });
}

export async function assignUserToRestaurant(userId: number, restaurantId: number): Promise<User> {
  // Reuse the updateUser function
  return updateUser(userId, { restaurantId });
}

export async function removeOrganizationAssignment(userId: number): Promise<User> {
  // Reuse the updateUser function
  return updateUser(userId, { organizationId: null });
}

export async function removeRestaurantAssignment(userId: number): Promise<User> {
  // Reuse the updateUser function
  return updateUser(userId, { restaurantId: null });
}
