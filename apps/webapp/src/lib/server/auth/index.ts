import type { zodSchemas } from '@ckm/db';
import type { Cookies, RequestEvent } from '@sveltejs/kit';
import { dev } from '$app/environment';

// Cookie names
const USER_ID_COOKIE = 'user_id';
const SESSION_TOKEN_COOKIE = 'session_token';

/**
 * Gets the user ID from cookies
 */

export function getUserCookie(event: RequestEvent): string | undefined {
  return event.cookies.get(USER_ID_COOKIE);
}

/**
 * Gets the session token from cookies
 */
export function getSessionCookie(event: RequestEvent): string | undefined {
  return event.cookies.get(SESSION_TOKEN_COOKIE);
}

/**
 * Sets the session token cookie with secure attributes
 */
export function setSessionTokenCookie(cookies: Cookies, token: string, expiresAt: Date): void {
  console.log('Setting session token cookie:', token);
  console.log('Setting session expiresAt:', expiresAt);
  console.log('Setting session  typeof expiresAt:', typeof expiresAt);
  try {
    cookies.set(SESSION_TOKEN_COOKIE, token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: !dev, // Only use non-secure cookies in development
      expires: expiresAt,
      maxAge: 60 * 60 * 24 * 30, // 30 days as backup
      path: '/'
    });
    console.log('Session token cookie set successfully');
  } catch (error) {
    console.error('Error setting session token cookie:', error);
  }
}

/**
 * Deletes the session token cookie
 */
export function deleteSessionTokenCookie(cookies: Cookies): void {
  console.log('Deleting session token cookie');
  try {
    cookies.delete(SESSION_TOKEN_COOKIE, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: !dev
    });
    console.log('Session token cookie deleted successfully');
  } catch (error) {
    console.error('Error deleting session token cookie:', error);
  }
}

/**
 * Sets user ID cookie with secure attributes
 */
export function setUserIdCookie(cookies: Cookies, userId: string | number, expiresAt: Date): void {
  console.log('Setting user ID cookie:', userId);
  try {
    cookies.set(USER_ID_COOKIE, userId.toString(), {
      httpOnly: true,
      sameSite: 'lax',
      secure: !dev,
      expires: expiresAt,
      maxAge: 60 * 60 * 24 * 30, // 30 days as backup
      path: '/'
    });
    console.log('User ID cookie set successfully');
  } catch (error) {
    console.error('Error setting user ID cookie:', error);
  }
}

/**
 * Deletes the user ID cookie
 */
export function deleteUserIdCookie(cookies: Cookies): void {
  cookies.delete(USER_ID_COOKIE, {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secure: !dev
  });
}

/**
 * Clears all authentication cookies
 */
export function clearAuthCookies(cookies: Cookies): void {
  deleteSessionTokenCookie(cookies);
  deleteUserIdCookie(cookies);
}

export type SessionValidationResult =
  | { session: zodSchemas.Session; user: zodSchemas.User }
  | { session: null; user: null };
