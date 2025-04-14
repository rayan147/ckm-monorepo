import { initClient, tsRestFetchApi, ApiFetcherArgs, isZodType } from '@ts-rest/core';
import { contract } from '@ckm/contracts';

let csrfToken: string | null = null;

const csrfFetcher = async (args: ApiFetcherArgs) => {
  try {
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
  } catch (error) {
    console.error('API request failed:', error);
    // More graceful error handling
    throw error;
  }
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

export const createApiClient = (customFetch: typeof fetch) =>
  initClient(contract, {
    baseUrl: getBaseUrl(),
    baseHeaders: {},
    api: (args) => tsRestCustomFetchApi(args, customFetch)
  });

export async function tsRestCustomFetchApi(
  { route, path, method, headers, body, validateResponse, fetchOptions }: ApiFetcherArgs,
  // This could alternatively default to the global `fetch`, or be an extra configuration object for potential future fields.
  customFetch?: typeof fetch,
) {
  const fetchFn = customFetch ?? globalThis.fetch

  const result = await fetchFn(path, {
    ...fetchOptions,
    method,
    headers,
    body,
  });

  const contentType = result.headers.get("content-type") ?? ""
  if (contentType.includes("application/json")) {
    const response = {
      status: result.status,
      body: await result.json(),
      headers: result.headers,
    };
    const responseSchema = route.responses[response.status];
    if ((validateResponse ?? route.validateResponseOnClient) &&
      isZodType(responseSchema)) {
      return {
        ...response,
        body: responseSchema.parse(response.body),
      };
    }
    return response;
  }
  else if (contentType.includes("text/")) {
    return {
      status: result.status,
      body: await result.text(),
      headers: result.headers,
    };
  }
  return {
    status: result.status,
    body: await result.blob(),
    headers: result.headers,
  };
};
