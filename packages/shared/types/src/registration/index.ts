
import type { Restaurant } from '@ckm/db';

export type RegistrationData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  isOrganization?: boolean;
  organizationName?: string;
  restaurants: Restaurant | Restaurant[];
};
