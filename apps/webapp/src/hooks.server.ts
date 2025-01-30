import { json, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve, }) => {
  // const token = event.cookies.get('session') ?? null;
  //
  // if (token === null) {
  //   // Clear client-side auth state if the session is invalid
  //   event.cookies.set('session', '', {
  //     path: '/',
  //     expires: new Date(0)
  //   });
  //
  //
  //   return Response.redirect(`${event.url.origin}/login`, 302);
  // }
  // // Here you might want to verify the session token
  //
  // const response = await resolve(event);
  // return response;
  //
  const res = await resolve(event)
  return res
};



export function handleError({ error, event }) {
  // Extract error details
  const { message, stack, status = 500 } = error;

  // Log to console (or send to a logging service)
  console.error(`[${new Date().toISOString()}] ${status} ${event.request.method} ${event.url.pathname}`, {
    message,
    stack,
    clientIP: event.getClientAddress(),
    userAgent: event.request.headers.get('user-agent')
  });

  // In production, hide sensitive error details
  const isProduction = process.env.NODE_ENV === 'production';

  return json({
    status,
    message: isProduction ? 'Something went wrong' : message,
    stack: isProduction ? undefined : stack
  }, { status });
}
