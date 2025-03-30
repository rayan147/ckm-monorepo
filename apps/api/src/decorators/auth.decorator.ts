import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { RoleGuard } from '../guards/role.guard';
import { UserRole } from '@ckm/db';
import { SessionAuthGuard } from 'src/guards/auth.session.guard';
import { CsrfGuard } from 'src/csrf/csrf.guard';

export function Auth(...roles: UserRole[]) {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(SessionAuthGuard, RoleGuard, CsrfGuard),
  );
}
