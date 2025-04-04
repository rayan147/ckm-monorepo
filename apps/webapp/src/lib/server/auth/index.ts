
import type { zodSchemas } from '@ckm/db';
import type { Cookies, RequestEvent } from '@sveltejs/kit';

export function getSessionCookie(event: RequestEvent): string | undefined {
  return event.cookies.get('session');
}

export function setSessionTokenCookie(cookies: Cookies, token: string, expiresAt: Date): void {
  cookies.set('session_token', token, {
    httpOnly: true,
    sameSite: 'lax',
    expires: expiresAt,
    path: '/'
  });
}

export function deleteSessionTokenCookie(cookies: Cookies): void {
  cookies.set('session_token', 'token', {
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 0,
    path: '/'
  });
}

export type SessionValidationResult =
  | { session: zodSchemas.Session; user: zodSchemas.User }
  | { session: null; user: null };
