// src/index.ts
import { initClient, tsRestFetchApi, isZodType } from "@ts-rest/core";
import { contract } from "@ckm/contracts";
var csrfToken = null;
var csrfFetcher = async (args) => {
  try {
    if (csrfToken) {
      args.headers = {
        ...args.headers,
        "X-CSRF-Token": csrfToken
      };
    }
    args.fetchOptions = {
      ...args.fetchOptions,
      credentials: "include"
    };
    const response = await tsRestFetchApi(args);
    const newToken = response.headers.get("x-csrf-token");
    if (newToken) {
      csrfToken = newToken;
    }
    return response;
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
};
var getBaseUrl = () => {
  if (typeof window !== "undefined") {
    const origin = window.location.origin;
    return origin.includes("localhost") ? "http://localhost:3000" : origin;
  }
  return "http://localhost:3000";
};
var api = initClient(contract, {
  baseUrl: getBaseUrl(),
  baseHeaders: {},
  api: csrfFetcher
});
var createApiClient = (customFetch) => initClient(contract, {
  baseUrl: getBaseUrl(),
  baseHeaders: {},
  api: (args) => tsRestCustomFetchApi(args, customFetch)
});
async function tsRestCustomFetchApi({ route, path, method, headers, body, validateResponse, fetchOptions }, customFetch) {
  var _a;
  const fetchFn = customFetch != null ? customFetch : globalThis.fetch;
  const result = await fetchFn(path, {
    ...fetchOptions,
    method,
    headers,
    body
  });
  const contentType = (_a = result.headers.get("content-type")) != null ? _a : "";
  if (contentType.includes("application/json")) {
    const response = {
      status: result.status,
      body: await result.json(),
      headers: result.headers
    };
    const responseSchema = route.responses[response.status];
    if ((validateResponse != null ? validateResponse : route.validateResponseOnClient) && isZodType(responseSchema)) {
      return {
        ...response,
        body: responseSchema.parse(response.body)
      };
    }
    return response;
  } else if (contentType.includes("text/")) {
    return {
      status: result.status,
      body: await result.text(),
      headers: result.headers
    };
  }
  return {
    status: result.status,
    body: await result.blob(),
    headers: result.headers
  };
}
export {
  api,
  createApiClient,
  tsRestCustomFetchApi
};
