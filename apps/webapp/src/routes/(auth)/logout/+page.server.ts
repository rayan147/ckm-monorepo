import { api } from '@ckm/lib-api';
import type { PageServerLoad } from '../forgot-password/$types';
import { clearAuthCookies } from '$lib/server/auth';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async (events) => {
  const cookies = events.cookies.get('session_token');
  if (events.locals.session && events.locals.user) {
    const { status, body } = await api.auth.logout({
      body: {
        userId: events.locals.user.id
      },
      extraHeaders: {
        cookies: cookies || ''
      }
    });

    if (status === 200) {
      console.log(body.message);
      clearAuthCookies(events.cookies);
    } else {
      console.error(body);
    }

    redirect(307, '/login');
  }
};
