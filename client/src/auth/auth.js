// auth0.js
import createAuth0Client from '@auth0/auth0-spa-js';



const auth0Config = {
  domain: import.meta.env.VITE_DOMAIN_NAME,
  client_id: import.meta.env.VITE_CLIENT_ID,
  redirect_uri: window.location.origin,

};

let auth0;

async function initAuth0() {
  auth0 = await createAuth0Client(auth0Config);
}

export { auth0, initAuth0 };
