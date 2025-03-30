// src/csrf/csrf.guard.ts
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { createCsrfUtilities } from './csrf.config';
import { EnvService } from '../env/env.service';

@Injectable()
export class CsrfGuard implements CanActivate {
  private csrfUtilities: ReturnType<typeof createCsrfUtilities>;

  constructor(private envService: EnvService) {
    this.csrfUtilities = createCsrfUtilities(envService);
  }

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    console.log('CSRF Guard Executed');
    console.log('CSRF Token from Header:', request.headers['x-csrf-token']);
    console.log('CSRF Cookie:', request.cookies['__Host-psifi.x-csrf-token']);

    try {
      // The validateRequest function only takes one argument
      this.csrfUtilities.validateRequest(request);
      return true;
    } catch (error) {
      console.error('CSRF Validation Failed:', error);
      return false;
    }
  }
}
