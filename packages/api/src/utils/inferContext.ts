import type { MiddlewareBuilder } from "@trpc/server";

export type InferContext<T> = T extends MiddlewareBuilder<
  infer TRoot,
  infer TNewParams
>
  ? TNewParams["_ctx_out"]
  : never;
