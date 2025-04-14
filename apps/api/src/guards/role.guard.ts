import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User, UserRole } from '@ckm/db';
import { PrismaService } from '../prisma/prisma.service';
import { ROLES_KEY } from 'src/decorators/roles.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Get required roles from metadata
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user: User = request.user;

    if (!user) {
      return false;
    }

    try {
      const dbUser = await this.prisma.user.findUnique({
        where: { id: user.id },
        include: {
          auth: true,
        },
      });

      if (!dbUser) {
        return false;
      }

      return dbUser.auth.some(auth => requiredRoles.includes(auth.role));
    } catch (error) {
      return false;
    }
  }
}
