// We need to avoid direct imports from other packages
// Instead, we'll use a general type
export type AppRouter = any;
import {
  createTRPCReact,
  inferReactQueryProcedureOptions,
} from "@trpc/react-query";
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

export type ReactQueryOptions = inferReactQueryProcedureOptions<AppRouter>;
export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;

export const trpc = createTRPCReact<AppRouter>();
