import { initClient, ApiFetcherArgs } from '@ts-rest/core';
import { contract } from '@ckm/contracts';

export const api = initClient(contract, {
  baseUrl: 'http://localhost:3000',
  baseHeaders: {},
});
// Create a function that takes the fetch instance
// export const createApi = (customFetch?: typeof fetch) => {
//   return initClient(contract, {
//     baseUrl: 'http://localhost:3000',
//     baseHeaders: {},
//     api: async (args: ApiFetcherArgs) => {
//       const { path, method, headers, body } = args;
//       const url = `http://localhost:3000/${path}`;

// Use the provided fetch or fall back to the fetch in the current scope
// const fetchImpl = customFetch || fetch;

//       try {
//         const response = await fetchImpl(url, {
//           method,
//           headers: new Headers(headers),
//           body: body ? JSON.stringify(body) : undefined,
//           credentials: 'include', // To handle cookies properly
//         });
//
//         // Create a proper Headers object
//         const responseHeaders = new Headers();
//         response.headers.forEach((value, key) => {
//           responseHeaders.append(key, value);
//         });
//
//         let responseBody;
//         const contentType = response.headers.get('content-type');
//         if (contentType && contentType.includes('application/json')) {
//           responseBody = await response.json();
//         } else {
//           responseBody = await response.text();
//         }
//
//         return {
//           status: response.status,
//           body: responseBody,
//           headers: responseHeaders,
//         };
//       } catch (error) {
//         console.error('API request failed:', error);
//         throw error;
//       }
//     },
//   });
// };
