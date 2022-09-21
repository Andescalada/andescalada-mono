import type { AppRouter } from "@andescalada/api/src/routers/_app";
import { createTRPCReact } from "@trpc/react";

export const trpc = createTRPCReact<AppRouter>();
