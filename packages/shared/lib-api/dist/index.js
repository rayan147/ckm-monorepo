"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  api: () => api
});
module.exports = __toCommonJS(index_exports);
var import_core = require("@ts-rest/core");
var import_contracts = require("@ckm/contracts");
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
  const response = await (0, import_core.tsRestFetchApi)(args);
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
var api = (0, import_core.initClient)(import_contracts.contract, {
  baseUrl: getBaseUrl(),
  baseHeaders: {},
  api: csrfFetcher
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  api
});
