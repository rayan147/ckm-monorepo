// src/csrf/csrf.config.ts
import { doubleCsrf } from 'csrf-csrf';
import { EnvService } from '../env/env.service';

export const createCsrfUtilities = (envService: EnvService) => {
  return doubleCsrf({
    getSecret: () => envService.get('CSRF_SECRET') || 'fallback-secret',
    cookieName: '__Host-psifi.x-csrf-token',
    cookieOptions: {
      httpOnly: false,
      sameSite: 'lax',
      path: '/',
      secure: envService.get('NODE_ENV') === 'prod',
    },
    getTokenFromRequest: (req) => {
      console.log('CSRF Token from Header:', req.headers['x-csrf-token']);
      console.log('CSRF Cookie:', req.cookies['__Host-psifi.x-csrf-token']);
      return req.headers['x-csrf-token'];
    },
  });
};
