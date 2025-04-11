import type { ParamMatcher } from '@sveltejs/kit';

export const match = ((param): param is 'login' | 'register' => {
  return param === 'login' || param === 'register';
}) satisfies ParamMatcher;
