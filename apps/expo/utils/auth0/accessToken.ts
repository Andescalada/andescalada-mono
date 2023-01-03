import { nativeReturnUrl } from "@utils/auth0/params";
import Env from "@utils/env";
import storage, { Storage } from "@utils/mmkv/storage";
import * as AuthSession from "expo-auth-session";
import { stringify } from "superjson";

import { tokenDecode } from "../decode";
const authUrl = `https://${Env.AUTH0_DOMAIN}/oauth/token`;
const headers = { "content-type": "application/json" };

export interface Tokens {
  idToken: string;
  accessToken: string;
  refreshToken: string;
}

interface RefreshTokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  id_token: string;
  scope: string;
  token_type: string;
}

const getTokens = async (
  code: string,
  codeVerifier: string,
): Promise<Tokens> => {
  const redirectUrl = AuthSession.makeRedirectUri({
    native: nativeReturnUrl,
  });

  const options = {
    method: "POST",
    url: authUrl,
    headers,
    body: JSON.stringify({
      grant_type: "authorization_code",
      client_id: Env.AUTH0_CLIENT_ID,
      code_verifier: codeVerifier,
      code,
      redirect_uri: redirectUrl,
    }),
  };

  const response = await fetch(authUrl, options);
  const data = await response.json();

  const idToken = data.id_token || "";
  const accessToken = data.access_token || "";
  const refreshToken = data.refresh_token || "";
  return { idToken, accessToken, refreshToken };
};

const getRefreshData = async (refreshToken: string) => {
  const options = {
    method: "POST",
    url: authUrl,
    headers,
    body: JSON.stringify({
      grant_type: "refresh_token",
      client_id: Env.AUTH0_CLIENT_ID,
      refresh_token: refreshToken,
    }),
  };

  const response = await fetch(authUrl, options);

  return response.json() as Promise<RefreshTokenResponse>;
};

export const refreshTokens = async () => {
  const refreshToken = storage.getString(Storage.REFRESH_TOKEN);

  if (!refreshToken) return;

  const response = await getRefreshData(refreshToken);

  storage.set(Storage.ACCESS_TOKEN, response.access_token);
  storage.set(Storage.REFRESH_TOKEN, response.refresh_token);

  const decodedIdToken = tokenDecode(response.id_token);
  storage.set(Storage.DECODED_ID_TOKEN, stringify(decodedIdToken));

  return { accessToken: response.access_token as string };
};

export default { getTokens, refreshTokens };
