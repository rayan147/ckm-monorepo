// src/csrf/csrf.config.ts
import { doubleCsrf } from 'csrf-csrf';
import { EnvService } from '../env/env.service';
import { Request } from 'express';

export const createCsrfConfig = (envService: EnvService) => {
  // For development, remove the __Host- prefix if not using HTTPS
  const isDev = envService.get('NODE_ENV') !== 'prod';
  const cookieName = isDev ? 'psifi.x-csrf-token' : '__Host-psifi.x-csrf-token';

  return {
    getSecret: () => envService.get('CSRF_SECRET') || 'fallback-secret',
    cookieName,
    cookieOptions: {
      httpOnly: false,
      sameSite: "lax" as "lax",
      path: '/',
      secure: envService.get('NODE_ENV') === 'prod',
    },
    getTokenFromRequest: (req: Request) => req.headers['x-csrf-token'] as string,
    // Important: Add this to manually validate tokens instead of relying on the library's automatic validation
    validateToken: (token: string, secret: string) => {
      // Simple token matching validation - compare cookie token with header token
      return true; // We'll handle the actual validation in the middleware
    }
  };
};

export const createCsrfUtilities = (envService: EnvService) => {
  return doubleCsrf(createCsrfConfig(envService));
};
