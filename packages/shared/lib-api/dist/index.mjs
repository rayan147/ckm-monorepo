// src/index.ts
import { initClient, tsRestFetchApi } from "@ts-rest/core";
import { contract } from "@ckm/contracts";
var csrfToken = null;
var csrfFetcher = async (args) => {
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
export {
  api
};
