import * as jose from "jose";
import type { NextApiRequest } from "next";

const verifyAndDecodeToken = async (req: NextApiRequest) => {
  if (process.env.OFFLINE_DEV === "true") {
    return {
      verified: true,
      user: {
        email: "elevy@andescalada.org",
        auth0Id: "",
        permissions: [] as string[],
      },
    };
  }
  try {
    const p = await fetch(
      `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
      { cache: "force-cache" },
    );

    const data: { keys: Record<string, unknown>[] } = await p.json();

    const keys = await Promise.all(data.keys.map((k) => jose.importJWK(k)));

    const firstKey = keys[0];

    const token = req.headers.authorization?.split(" ")[1];

    if (firstKey && token) {
      await jose.jwtVerify(token, firstKey, {
        issuer: `https://${[process.env.AUTH0_DOMAIN]}/`, // issuer
        audience: process.env.AUTH0_AUDIENCE, // audience
      });

      const data = jose.decodeJwt(token);

      return {
        verified: true,
        user: {
          email: data.user_email as string,
          auth0Id: data.sub,
          permissions: data.permissions as string[],
        },
      };
    }
  } catch (err) {
    return {
      verified: false,
      user: undefined,
    };
  }
  return {
    verified: undefined,
    user: undefined,
  };
};

export default verifyAndDecodeToken;
