import Env from "@utils/env";

const domain = Env.AUTH0_DOMAIN;
const clientId = Env.AUTH0_CLIENT_ID;
const audience = Env.AUTH0_AUDIENCE;

interface LoginResponse {
  _id: string;
  email: string;
  email_verified: boolean;
}
interface VerificatonCodeSuccess {
  access_token: string;
  expires_in: number;
  id_token: string;
  refresh_token: string;
  scope: "openid profile offline_access";
  token_type: "Bearer";
}

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

  return res.json() as unknown as LoginResponse;
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
      scope: "openid name profile offline_access",
    }),
  });

  const result = await res.json();

  if (res.status !== 200) {
    throw new Error(errorDescription(result.error_description), {
      cause: result.error,
    });
  }

  return result as unknown as VerificatonCodeSuccess;
};

export default { login, verifyCode };

const errorDescription = (description: string) => {
  switch (description) {
    case "You've reached the maximum number of attempts. Please try to login again.":
      return "Has alcanzado el número máximo de intentos, por favor ingresa tu correo de nuevo para recibir un nuevo código.";
    case "Wrong email or verification code.":
      return "Código inválido";
    case "Your account has been blocked after multiple consecutive login attempts. We've sent you an email with instructions on how to unblock it.":
      return "Tu cuenta ha sido bloqueada después de múltiples intentos de inicio de sesión consecutivos. Te hemos enviado un correo electrónico con instrucciones sobre cómo desbloquearla.";
    case "The verification code has expired. Please try to login again.":
      return "El código de verificación ha expirado. Por favor, intenta iniciar sesión nuevamente.";
    default:
      return description;
  }
};
