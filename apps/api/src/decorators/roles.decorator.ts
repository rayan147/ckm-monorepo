import { SetMetadata } from '@nestjs/common';
import { UserRole } from '@ckm/db';

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);
