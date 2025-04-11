import { type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { handle as authHandle } from '$lib/server/auth/handle';
import { handle as userHandle } from '$lib/server/auth/user';
import { handle as loggingHandle } from '$lib/server/logging/logging';
import { handle as securiyHeadersHandle } from '$lib/server/security/handle';

// The sequence determines execution order:
// 1. First log the request
// 2. Then validate user session
// 3. Then handle user authentication
export const handle: Handle = sequence(
  loggingHandle, // Log first to capture all requests
  authHandle, // Check for valid session token
  userHandle, // Load user data if authenticated
  securiyHeadersHandle
);
