// $lib/server/auth/user.ts
import type { Handle } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import { getUserCookie, getSessionCookie, clearAuthCookies, setSessionTokenCookie } from '.';

export const handle: Handle = async ({ event, resolve }) => {
  console.log('User handle - event.locals:', event.locals);

  const userId = getUserCookie(event);
  const sessionToken = getSessionCookie(event);

  // If we have both a user ID and session token, fetch user data
  if (userId && sessionToken) {
    console.log('Both userId and sessionToken found, fetching user data');

    try {
      // Convert userId to number, handling possible JSON string format
      let userIdNumber: number;
      try {
        // First try parsing as JSON in case it's stored as a JSON string
        userIdNumber = JSON.parse(userId);
      } catch (e) {
        // If it's not JSON, try direct conversion
        userIdNumber = parseInt(userId, 10);
      }

      if (isNaN(userIdNumber)) {
        console.error('Invalid user ID format:', userId);
        console.log('Clearing auth cookies due to invalid user ID');
        clearAuthCookies(event.cookies);

        // Make sure to throw the redirect
        if (event.url.pathname.startsWith('/dashboard')) {
          const returnUrl = encodeURIComponent(event.url.pathname + event.url.search);
          throw redirect(303, `/login?returnUrl=${returnUrl}`);
        } else {
          throw redirect(303, '/login');
        }
      }
    } catch (e) {
      console.error('Failed to fetch user:', e);

      // Only redirect on dashboard routes to prevent redirect loops
      if (event.url.pathname.startsWith('/dashboard')) {
        // Don't clear cookies on errors - let the server handle auth
        console.log('API error but not clearing cookies');
        const returnUrl = encodeURIComponent(event.url.pathname + event.url.search);
        throw redirect(303, `/login?returnUrl=${returnUrl}`);
      }
    }
  } else {
    console.log('Missing userId or sessionToken');

    if (event.url.pathname.startsWith('/dashboard')) {
      // If no user ID or session token on protected routes, redirect to login
      console.log('Redirecting to login from protected route');
      const returnUrl = encodeURIComponent(event.url.pathname + event.url.search);
      throw redirect(303, `/login?returnUrl=${returnUrl}`);
    }
  }

  return resolve(event);
};
