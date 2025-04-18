// src/lib/types/models.ts
export interface User {
  id: number;
  email: string;
  sub?: number;
  firstName: string;
  lastName: string;
  profileImage?: string;
  organizationId?: number;
  restaurantId?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Organization {
  id: number;
  name: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Restaurant {
  id: number;
  name: string;
  imageUrl?: string;
  address: string;
  city: string;
  zipCode: string;
  state: string;
  owner: string;
  organizationId?: number;
  foodCost?: number;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  deleted?: string;
}

export type RestaurantType = 'CATERING' | 'HEALTHCARE' | 'SCHOOL' | 'NURSING_HOME' | 'WELLNESS_RETREAT';

export interface ResourceWithStatus {
  id: number;
  name: string;
  status: 'active' | 'archived';
}
