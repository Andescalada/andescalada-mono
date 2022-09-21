import { imageParser } from "@andescalada/api/src/routers/images";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { t } from "../createRouter";

export const toposRouter = t.router({
  byId: t.procedure.input(z.string()).query(async ({ ctx, input }) => {
    const topo = await ctx.prisma.topo.findUnique({
      where: { id: input },
      include: {
        RoutePath: {
          include: { route: { select: { id: true, position: true } } },
        },
        image: { select: { url: true, height: true, width: true } },
      },
    });
    if (!topo) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `No topo with id '${input}'`,
      });
    }
    return topo;
  }),
  add: t.procedure
    .input(
      z.object({
        wallId: z.string(),
        name: z.string().optional(),
        main: z.boolean().optional(),
        image: imageParser,
      }),
    )
    .mutation(({ ctx, input }) =>
      ctx.prisma.topo.create({
        data: {
          main: input.main,
          name: input.name,
          Wall: { connect: { id: input.wallId } },
          image: {
            create: {
              ...input.image,
            },
          },
        },
      }),
    ),
});
