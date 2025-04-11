import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { UserRole } from '@ckm/db';
import { clearAuthCookies, getUserCookie, getSessionCookie } from '$lib/server/auth';
import { api } from '@ckm/lib-api';

export const GET: RequestHandler = async ({ locals }) => {
  if (locals.user && locals.user.auth) {
    const { id, email, firstName, lastName, profileImage, createdAt, updatedAt } = locals.user;

    const priorityOrder = [
      UserRole.ADMIN,
      UserRole.MANAGER,
      UserRole.CHEF,
      UserRole.STAFF,
      UserRole.VENDOR
    ] as const;

    const sortedAuth = [...(locals.user.auth || [])]
      .filter((auth) => auth !== null && auth !== undefined)
      .sort((a, b) => {
        const roleA = a?.role || '';
        const roleB = b?.role || '';
        return priorityOrder.indexOf(roleA) - priorityOrder.indexOf(roleB);
      });

    const role = sortedAuth.length > 0 ? sortedAuth[0]?.role : null;

    // Log successful authentication
    console.log(`User authenticated: ${email} with role ${role}`);
    return json({
      id,
      email,
      firstName,
      lastName,
      profileImage,
      createdAt,
      updatedAt,
      role
    });
  }

  return json({ error: 'UnAuthorized' });
};

export const POST: RequestHandler = async (event) => {
  console.log('Server: Processing logout request');
  const sessionToken = getSessionCookie(event);
  const userId = getUserCookie(event);

  console.log('Server: Session token exists:', !!sessionToken);
  console.log('Server: User ID from cookie:', userId);

  const cookies = event.request.headers.get('cookie');
  console.log('the cookies is', cookies);
  try {
    if (sessionToken) {
      if (!userId) {
        console.log('Server: No user ID found in cookie');
        return json({ success: false, message: `User Id not found` });
      }

      if (userId) {
        console.log('Server: Calling API logout with userId:', userId);
        const result = await api.auth.logout({
          body: {
            userId: parseInt(userId)
          },
          extraHeaders: {
            cookie: cookies || ''
          }
        });
        console.log('Server: API logout result:', result);
      }
    } else {
      console.log('Server: No session token found');
    }

    console.log('Server: Logout completed, clearing cookies');
    return json({ success: true });
  } catch (error) {
    console.error('Server: Logout error:', error);
    return json({ success: false, message: 'Logout failed' }, { status: 500 });
  } finally {
    clearAuthCookies(event.cookies);
  }
};
