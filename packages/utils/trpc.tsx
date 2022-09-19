import { createTRPCReact } from '@trpc/react';
import type { AppRouter } from '@andescalada/api/src/routers/_app';

export const trpc = createTRPCReact<AppRouter>();
