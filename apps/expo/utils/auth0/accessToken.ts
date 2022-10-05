import { Storage } from "@assets/Constants";
import { AUTH0_CLIENT_ID, AUTH0_DOMAIN } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { nativeReturnUrl } from "@utils/auth0/params";
import * as AuthSession from "expo-auth-session";
import { stringify } from "superjson";

import { tokenDecode } from "../decode";
const authUrl = `https://${AUTH0_DOMAIN}/oauth/token`;
const headers = { "content-type": "application/json" };

export interface Tokens {
  idToken: string;
  accessToken: string;
  refreshToken: string;
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
      client_id: AUTH0_CLIENT_ID,
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
      client_id: AUTH0_CLIENT_ID,
      refresh_token: refreshToken,
    }),
  };

  const response = await fetch(authUrl, options);

  return response.json();
};

export const refreshTokens = async () => {
  const refreshToken = await AsyncStorage.getItem(Storage.REFRESH_TOKEN);
  if (!refreshToken) return;
  const response = await getRefreshData(refreshToken);
  await AsyncStorage.setItem(Storage.ACCESS_TOKEN, response.data.access_token);
  await AsyncStorage.setItem(
    Storage.REFRESH_TOKEN,
    response.data.refresh_token,
  );
  const decodedJwtIdToken = tokenDecode(response.data.id_token);
  await AsyncStorage.setItem(
    Storage.DECODED_ID_TOKEN,
    stringify(decodedJwtIdToken),
  );
  return { accessToken: response.data.access_token as string };
};

export default { getTokens, refreshTokens };
