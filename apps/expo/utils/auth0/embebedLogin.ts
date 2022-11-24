import Env from "@utils/env";

const domain = Env.AUTH0_DOMAIN;
const clientId = Env.AUTH0_CLIENT_ID;
const audience = Env.AUTH0_AUDIENCE;

const login = async (email: string) => {
  const res = await fetch(`https://${domain}/passwordless/start`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: clientId,
      connection: "email",
      email: email,
      send: "code",
    }),
  });

  return res.json();
};

const verifyCode = async (email: string, code: string) => {
  const res = await fetch(`https://${domain}/oauth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      grant_type: "http://auth0.com/oauth/grant-type/passwordless/otp",
      client_id: clientId,
      username: email,
      otp: code,
      realm: "email",
      audience: audience,
      scope: "openid profile email",
    }),
  });

  return res.json();
};

export default { login, verifyCode };
