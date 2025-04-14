import type { Handle } from '@sveltejs/kit';
import { getSecurityHeaders } from './security';

export const handle: Handle = async ({ event, resolve }) => {
  const response = await resolve(event, {
    filterSerializedResponseHeaders: (name) =>
      ['content-type', 'x-custom-header'].includes(name.toLowerCase())
  });
  const securityHeaders = getSecurityHeaders();

  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
};
