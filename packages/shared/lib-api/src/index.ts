import { initClient, tsRestFetchApi, ApiFetcherArgs } from '@ts-rest/core';
import { contract } from '@ckm/contracts';

let csrfToken: string | null = null;

const csrfFetcher = async (args: ApiFetcherArgs) => {
  if (csrfToken) {
    args.headers = {
      ...args.headers,
      'X-CSRF-Token': csrfToken
    };
  }

  args.fetchOptions = {
    ...args.fetchOptions,
    credentials: 'include'
  };

  const response = await tsRestFetchApi(args);

  const newToken = response.headers.get('x-csrf-token');
  if (newToken) {
    csrfToken = newToken;
  }

  return response;
};

// Use environment-aware baseUrl
const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    const origin = window.location.origin;
    return origin.includes('localhost') ? 'http://localhost:3000' : origin;
  }

  return 'http://localhost:3000';
};

// Define the API type explicitly to avoid TypeScript's reference issues
export const api = initClient(contract, {
  baseUrl: getBaseUrl(),
  baseHeaders: {},
  api: csrfFetcher
});
