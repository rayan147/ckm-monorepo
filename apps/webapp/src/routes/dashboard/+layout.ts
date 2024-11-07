import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import { auth } from '$lib/stores/auth';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async () => {
	if (browser) {
		const unsubscribe = auth.subscribe(($auth) => {
			if (!$auth.isAuthenticated && !$auth.isLoading) {
				goto('/login');
			}
		});

		unsubscribe();
	}

	return {};
};
