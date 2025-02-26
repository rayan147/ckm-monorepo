// src/index.ts
import { initClient } from "@ts-rest/core";
import { contract } from "@ckm/contracts";
var api = initClient(contract, {
  baseUrl: "http://localhost:3000",
  baseHeaders: {},
  Credentials: true
});
export {
  api
};
