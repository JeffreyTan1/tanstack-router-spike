// Example of how we could use the openapi-fetch middleware to create a auth aware api client

// import { useAuth } from "../auth";
// import createClient, { type Middleware } from "openapi-fetch";
// import type { paths } from "./my-openapi-3-schema";

// export function useApiClient() {
//     const { jwtToken } = useAuth()

// let accessToken: string | undefined = undefined;

// const authMiddleware: Middleware = {
//   async onRequest({ request }) {
//     // fetch token, if it doesn’t exist
//     if (!accessToken) {
//       const authRes = await someAuthFunc();
//       if (authRes.accessToken) {
//         accessToken = authRes.accessToken;
//       } else {
//         // handle auth error
//       }
//     }

//     // (optional) add logic here to refresh token when it expires

//     // add Authorization header to every request
//     request.headers.set("Authorization", `Bearer ${accessToken}`);
//     return request;
//   },
// };

// const client = createClient<paths>({ baseUrl: "https://myapi.dev/v1/" });
// client.use(authMiddleware);

// return client;

// }
