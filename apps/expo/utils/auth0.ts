import axios from 'axios';

import * as AuthSession from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { AUTH0_AUDIENCE, AUTH0_CLIENT_ID, AUTH0_DOMAIN } from '@env';
import {
  URLEncode,
  base64encode,
  getRandomBytes,
  sha256,
  tokenDecode,
  getShortUUID,
  toQueryString,
} from './decode';

const auth0Domain = AUTH0_DOMAIN;

const config = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
};
const nativeReturnUrl = `andescalada://${auth0Domain}/${Platform.OS}/@eyalll/andescalada-app/callback`;

export interface Tokens {
  idToken: string;
  accessToken: string;
  refreshToken: string;
}

export interface LoginResponse {
  decodedIdToken: unknown;
  accessToken: string;
  refreshToken: string;
}

const settings = {
  response_type: 'code',
  code_challenge_method: 'S256',
  client_id: AUTH0_CLIENT_ID,
  clientId: AUTH0_CLIENT_ID,
  scope: 'openid name profile',
  audience: AUTH0_AUDIENCE,
};

const getTokens = async (
  code: string,
  codeVerifier: string,
): Promise<Tokens> => {
  console.log('In getTokens');
  const redirectUrl = AuthSession.makeRedirectUri({
    native: nativeReturnUrl,
  });
  const params = new URLSearchParams();
  params.append('grant_type', 'authorization_code');
  params.append('client_id', settings.client_id);
  params.append('code_verifier', codeVerifier);
  params.append('code', code);
  params.append('redirect_uri', redirectUrl);
  const authUrl = `https://${auth0Domain}/oauth/token`;

  const response = await axios.post(authUrl, params, config);

  const idToken = response.data.id_token;
  const accessToken = response.data.access_token;
  const refreshToken = response.data.refresh_token;
  return { idToken, accessToken, refreshToken };
};

const getRefreshData = async (refreshToken: string) => {
  const params = new URLSearchParams();
  params.append('grant_type', 'refresh_token');
  params.append('client_id', settings.client_id);
  params.append('refresh_token', refreshToken);
  const authUrl = `https://${auth0Domain}/oauth/token`;
  const response = await axios.post(authUrl, params, config);
  return response;
};

const onLoginResponse = async (
  response: AuthSession.AuthSessionResult,
  state: string,
  codeVerifier: string,
): Promise<LoginResponse> => {
  console.log('in onLoginResponse');
  if (response.type !== 'success' || response.params.state !== state) {
    throw new Error();
  }
  const { idToken, accessToken, refreshToken } = await getTokens(
    response.params.code,
    codeVerifier,
  );
  const decodedJwtIdToken = tokenDecode(idToken);

  return { decodedIdToken: decodedJwtIdToken, accessToken, refreshToken };
};

export const login = async (): Promise<LoginResponse> => {
  const state = getShortUUID();
  const codeVerifier = URLEncode(base64encode(getRandomBytes(32)));
  const codeChallenge = URLEncode(await sha256(codeVerifier));
  const redirectUrl = AuthSession.makeRedirectUri({
    native: nativeReturnUrl,
  });
  console.log({ redirectUrl });
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

  const errorMsg = 'Signup disabled';
  if (
    response.type !== 'success' ||
    response.params?.error_description === errorMsg
  ) {
    return {
      decodedIdToken: { 'https://api.houm.com/roles': [errorMsg] },
      accessToken: '',
      refreshToken: '',
    };
  }
  return onLoginResponse(response, state, codeVerifier);
};

const refreshTokens = async () => {
  const refreshToken = await AsyncStorage.getItem('REFRESH_TOKEN');
  if (!refreshToken) return;
  const response = await getRefreshData(refreshToken);
  await AsyncStorage.setItem('TOKEN', response.data.access_token);
  await AsyncStorage.setItem('REFRESH_TOKEN', response.data.refresh_token);
  const decodedJwtIdToken = tokenDecode(response.data.id_token);
  await AsyncStorage.setItem('IDTOKEN', String(decodedJwtIdToken));
};

export default { login, refreshTokens };
