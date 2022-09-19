// src/utils/trpc.ts
import { setupTRPC } from "@trpc/next";
import type { AppRouter } from "@andescalada/api/src";
import { transformer } from "@andescalada/api/src/transformer";

const getBaseUrl = () => {
  if (typeof window !== "undefined") return ""; // browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url

  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

export const trpc = setupTRPC<AppRouter>({
  config() {
    return {
      url: `${getBaseUrl()}/api/trpc`,
      transformer,
    };
  },
  ssr: false,
});
