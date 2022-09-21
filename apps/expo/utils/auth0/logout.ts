import { AUTH0_CLIENT_ID, AUTH0_DOMAIN } from "@env";
import { nativeReturnUrl } from "@utils/auth0/params";
import * as AuthSession from "expo-auth-session";

import { toQueryString } from "../decode";

const logout = async () => {
  const redirectUrl = AuthSession.makeRedirectUri({
    native: nativeReturnUrl,
  });
  const params = {
    returnTo: redirectUrl,
    client_id: AUTH0_CLIENT_ID,
  };
  const queryParams = toQueryString(params);
  const authUrl = `https://${AUTH0_DOMAIN}/v2/logout${queryParams}`;
  return await AuthSession.startAsync({
    authUrl,
    returnUrl: redirectUrl,
  });
};

export default logout;
