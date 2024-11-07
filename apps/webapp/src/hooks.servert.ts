import type { Handle } from '@sveltejs/kit';
import { auth } from '$lib/stores/auth';

export const handle: Handle = async ({ event, resolve }) => {
	if (event.url.pathname.startsWith('/dashboard')) {
		const session = event.cookies.get('session');
		console.log(event);
		if (!session) {
			// Clear client-side auth state if the session is invalid
			auth.logout();
			return Response.redirect(`${event.url.origin}/login`, 302);
		}
		// Here you might want to verify the session token
	}

	const response = await resolve(event);
	return response;
};
