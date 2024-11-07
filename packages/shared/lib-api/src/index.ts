import { initClient } from '@ts-rest/core';
import { contract } from '@ckm/contracts';

export const api = initClient(contract, {
  baseUrl: 'http://localhost:3000',
  baseHeaders: {},
});
