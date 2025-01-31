import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { doubleCsrf } from 'csrf-csrf';
import { EnvService } from '../env/env.service';

@Injectable()
export class CsrfGuard implements CanActivate {
  constructor(private envService: EnvService) { }

  private validateRequest = doubleCsrf({
    getSecret: () => this.envService.get('CSRF_SECRET'),
    cookieName: '__Host-psifi.x-csrf-token'
  }).validateRequest;

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    try {
      this.validateRequest(request);
      return true;
    } catch (error) {
      return false;
    }
  }
}
