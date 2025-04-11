import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { clearAuthCookies, getUserCookie, getSessionCookie } from '$lib/server/auth';
import { api } from '@ckm/lib-api';

export const POST: RequestHandler = async (event) => {
  const sessionToken = getSessionCookie(event);
  const userId = getUserCookie(event);

  try {
    if (sessionToken) {
      if (!userId) {
        json({ success: false, message: `User Id not found` });
      }

      if (userId) {
        await api.auth.logout({
          body: {
            userId: parseInt(userId)
          }
        });
      }
    }

    return json({ success: true });
  } catch (error) {
    console.error(error);
    return json({ success: false, message: 'Logout failed' }, { status: 500 });
  } finally {
    clearAuthCookies(event.cookies);
  }
};

// Support GET for logout via browser link
export const GET: RequestHandler = async (event) => {
  return POST(event);
};
