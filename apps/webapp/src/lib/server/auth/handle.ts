import { api } from '@ckm/lib-api';
import type { Handle } from '@sveltejs/kit';
import { getSessionCookie, setSessionTokenCookie, deleteSessionTokenCookie } from '.';

export const handle: Handle = async ({ event, resolve }) => {
  const sessionToken = getSessionCookie(event);
  if (!sessionToken) {
    return resolve(event);
  }

  try {
    const cookies = event.request.headers.get('cookie');
    console.log({ cookies });

    const response = await api.auth.validateSessionToken({
      body: {
        sessionToken
      },
      extraHeaders: {
        cookie: cookies || ''
      }
    });

    if (response.status === 200) {
      const { session, user } = response.body;
      if (session) {
        setSessionTokenCookie(event.cookies, sessionToken, new Date(session.expiresAt));
        event.locals.user = user;
        event.locals.session = session;
      }
    } else {
      console.error(response.body);
      deleteSessionTokenCookie(event.cookies);
    }
  } catch (error) {
    console.error({ error });
  }
  event.locals.token = sessionToken;
  return resolve(event);
};
