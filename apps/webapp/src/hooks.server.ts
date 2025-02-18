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
  //
  // const res = await resolve(event)
  // return res
  return await resolve(event)
};


