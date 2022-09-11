import * as Random from 'expo-random';
import * as Crypto from 'expo-crypto';
import jwtDecode from 'jwt-decode';
import { Buffer } from 'buffer';

export const URLEncode = (str: string): string =>
  str.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
export const base64encode = (data: ArrayBuffer): string =>
  Buffer.from(data).toString('base64');
export const getRandomBytes = (bytesCount: number): Uint8Array =>
  Random.getRandomBytes(bytesCount);
export const sha256 = async (str: string): Promise<string> =>
  Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, str, {
    encoding: Crypto.CryptoEncoding.BASE64,
  });
export const tokenDecode = <T = unknown>(token: string): T => {
  return jwtDecode(token);
};
export const getShortUUID = (): string =>
  Math.random().toString(36).substring(2, 15);

export interface StringMap {
  [key: string]: string;
}

export const toQueryString = (params: StringMap): string =>
  `?${Object.entries(params)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
    )
    .join('&')}`;
