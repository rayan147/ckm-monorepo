import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

// export const load: LayoutServerLoad = async ({ cookies, url }) => {
// 	const session = cookies.get('session');
// 	if (!session) {
// 		throw redirect(307, `/login?redirectTo=${url.pathname}`);
// 	}

// 	// Here you can also fetch and return any data needed for the dashboard
// 	return {
// 		// any data you want to pass to the dashboard layout
// 	};
// };
