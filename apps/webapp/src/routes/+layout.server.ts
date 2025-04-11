import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ locals, url }) => {
  if (!locals.token && url.pathname.startsWith('/dashboard')) {
    error(401, 'not logged in');
  }
  //
  // if (!locals.user.isAdmin) {
  //   error(403, 'not an admin');
  // }
};
