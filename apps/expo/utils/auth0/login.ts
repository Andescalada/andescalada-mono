import auth0Tokens from "@utils/auth0/accessToken";
import { nativeReturnUrl } from "@utils/auth0/params";
import Env from "@utils/env";
import * as AuthSession from "expo-auth-session";

import {
  base64encode,
  getRandomBytes,
  getShortUUID,
  sha256,
  toQueryString,
  URLEncode,
} from "../decode";

const auth0Domain = Env.AUTH0_DOMAIN;

export interface LoginResponse {
  idToken: string;
  accessToken: string;
  refreshToken: string;
}

const settings = {
  response_type: "code",
  code_challenge_method: "S256",
  client_id: Env.AUTH0_CLIENT_ID,
  clientId: Env.AUTH0_CLIENT_ID,
  scope: "openid name profile offline_access",
  audience: Env.AUTH0_AUDIENCE,
};

const onLoginResponse = async (
  response: AuthSession.AuthSessionResult,
  state: string,
  codeVerifier: string,
): Promise<LoginResponse> => {
  if (response.type !== "success" || response.params.state !== state) {
    throw new Error();
  }
  const { idToken, accessToken, refreshToken } = await auth0Tokens.getTokens(
    response.params.code,
    codeVerifier,
  );

  return { idToken, accessToken, refreshToken };
};

export const login = async (): Promise<LoginResponse> => {
  const state = getShortUUID();
  const codeVerifier = URLEncode(base64encode(getRandomBytes(32)));
  const codeChallenge = URLEncode(await sha256(codeVerifier));
  const redirectUrl = AuthSession.makeRedirectUri({
    native: nativeReturnUrl,
    preferLocalhost: __DEV__,
  });

  const params = {
    code_challenge: codeChallenge,
    redirect_uri: redirectUrl,
    state,
    ...settings,
  };

  const queryParams = toQueryString(params);
  const authUrl = `https://${auth0Domain}/authorize${queryParams}`;
  const response = await AuthSession.startAsync({
    authUrl,
    returnUrl: redirectUrl,
  });

  const errorMsg = "Signup disabled";
  if (
    response.type !== "success" ||
    response.params?.error_description === errorMsg
  ) {
    return {
      idToken: "",
      accessToken: "",
      refreshToken: "",
    };
  }

  return onLoginResponse(response, state, codeVerifier);
};

export default login;
