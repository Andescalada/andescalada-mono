import { GlobalRoles } from "@andescalada/api/src/utils/globalRoles";
import * as jose from "jose";
import type { NextApiRequest } from "next";

const verifyAndDecodeToken = async (req: NextApiRequest) => {
  if (process.env.OFFLINE_DEV === "true") {
    return {
      verified: true,
      verifiedUser: {
        connectionStrategy: "email",
        email: "elevy@andescalada.org",
        auth0Id: "",
        permissions: [] as GlobalRoles[],
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
        verifiedUser: {
          connectionStrategy: data.connection_strategy as
            | "email"
            | "sms"
            | "auth0",
          phoneNumber: data.phone_number as string | undefined,
          email: data.user_email as string | undefined,
          auth0Id: data.sub,
          permissions: data.permissions as GlobalRoles[],
        },
      };
    }
  } catch (err) {
    return {
      verified: false,
      verifiedUser: undefined,
    };
  }
  return {
    verified: undefined,
    verifiedUser: undefined,
  };
};

export default verifyAndDecodeToken;
