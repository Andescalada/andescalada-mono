import topo from "@andescalada/api/schemas/topo";
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
        image: {
          select: { url: true, height: true, width: true, publicId: true },
        },
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
  add: t.procedure.input(topo.schema).mutation(({ ctx, input }) =>
    ctx.prisma.topo.create({
      data: {
        main: input.main,
        name: input.name,
        Wall: { connect: { id: input.wallId } },
        image: {
          create: input.image,
        },
      },
    }),
  ),
});
