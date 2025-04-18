// src/lib/api/organizations.ts
import type { Organization } from '$lib/components/types/models';

// Simulated API endpoint - in a real app you'd connect to your backend
// Mock data instead of trying to fetch from actual endpoints
const mockOrganizations: Organization[] = [
  { id: 1, name: 'Acme Catering', imageUrl: null, createdAt: '2023-10-01T14:00:00Z', updatedAt: '2023-10-01T14:00:00Z' },
  { id: 2, name: 'Healthcare Services Inc.', imageUrl: null, createdAt: '2023-11-15T09:30:00Z', updatedAt: '2023-11-15T09:30:00Z' },
  { id: 3, name: 'School District 12', imageUrl: null, createdAt: '2024-01-05T10:15:00Z', updatedAt: '2024-01-05T10:15:00Z' },
  { id: 4, name: 'Golden Years Homes', imageUrl: null, createdAt: '2024-02-20T16:45:00Z', updatedAt: '2024-02-20T16:45:00Z' }
];

export async function fetchOrganizations(): Promise<Organization[]> {
  // Return mock data directly without API call
  return [...mockOrganizations];
}

export async function getOrganization(id: number): Promise<Organization> {
  const organization = mockOrganizations.find(org => org.id === id);

  if (!organization) {
    throw new Error(`Organization with ID ${id} not found`);
  }

  return { ...organization };
}

export async function createOrganization(organization: { name: string, imageUrl?: string }): Promise<Organization> {
  // Create a new mock organization
  const newId = Math.max(...mockOrganizations.map(org => org.id)) + 1;
  const now = new Date().toISOString();

  const newOrganization: Organization = {
    id: newId,
    name: organization.name,
    imageUrl: organization.imageUrl || null,
    createdAt: now,
    updatedAt: now
  };

  // In a real app, this would update the database
  mockOrganizations.push(newOrganization);

  return { ...newOrganization };
}

export async function updateOrganization(id: number, updates: { name?: string, imageUrl?: string }): Promise<Organization> {
  const organizationIndex = mockOrganizations.findIndex(org => org.id === id);

  if (organizationIndex === -1) {
    throw new Error(`Organization with ID ${id} not found`);
  }

  const now = new Date().toISOString();

  // Update the organization
  mockOrganizations[organizationIndex] = {
    ...mockOrganizations[organizationIndex],
    ...updates,
    updatedAt: now
  };

  return { ...mockOrganizations[organizationIndex] };
}

export async function deleteOrganization(id: number): Promise<boolean> {
  const organizationIndex = mockOrganizations.findIndex(org => org.id === id);

  if (organizationIndex === -1) {
    throw new Error(`Organization with ID ${id} not found`);
  }

  // Remove the organization
  mockOrganizations.splice(organizationIndex, 1);

  return true;
}
