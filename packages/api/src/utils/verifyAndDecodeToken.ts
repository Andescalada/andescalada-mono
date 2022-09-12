import * as jose from 'jose';
import type { NextApiRequest } from 'next';

const verifyAndDecodeToken = async (req: NextApiRequest) => {
  try {
    const p = await fetch(
      `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
      { cache: 'force-cache' },
    );

    const data: { keys: Record<string, unknown>[] } = await p.json();

    const keys = await Promise.all(data.keys.map((k) => jose.importJWK(k)));

    const firstKey = keys[0];

    const token = req.headers.authorization?.split(' ')[1];

    if (firstKey && token) {
      await jose.jwtVerify(token, firstKey, {
        issuer: `https://${[process.env.AUTH0_DOMAIN]}/`, // issuer
        audience: process.env.AUTH0_AUDIENCE, // audience
      });

      const data = jose.decodeJwt(token);
      return {
        email: data.user_email as string,
        permissions: data.permissions as string[],
      };
    }
    return undefined;
  } catch {
    return undefined;
  }
};

export default verifyAndDecodeToken;
