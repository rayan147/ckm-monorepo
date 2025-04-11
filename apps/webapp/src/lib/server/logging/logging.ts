// $lib/server/logging.ts
import type { Handle } from '@sveltejs/kit';
import { v4 as uuid } from 'uuid';

export const handle: Handle = async ({ event, resolve }) => {
  const requestId = uuid();
  const start = Date.now();
  console.log(`[${requestId}] ⬅️ ${event.request.method} ${event.url.pathname}`);

  const response = await resolve(event);
  const duration = Date.now() - start;
  console.log(`[${requestId}] ➡️ ${response.status} (${duration}ms)`);

  return response;
};
