import { api, setCsrfTokenGetter } from '@ckm/lib-api';

// Set the token getter to use your CSRF state
setCsrfTokenGetter(getToken);

// Export the configured API client
export { api };
