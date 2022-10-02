import topo from "@andescalada/api/schemas/topo";
import { protectedProcedure } from "@andescalada/api/src/utils/protectedProcedure";
import { slug } from "@andescalada/api/src/utils/slug";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { t } from "../createRouter";

export const toposRouter = t.router({
  byId: t.procedure.input(z.string()).query(async ({ ctx, input }) => {
    const topo = await ctx.prisma.topo.findUnique({
      where: { id: input },
      include: {
        RoutePath: {
          include: { Route: { select: { id: true, position: true } } },
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
  add: protectedProcedure.input(topo.schema).mutation(({ ctx, input }) =>
    ctx.prisma.topo.create({
      data: {
        main: input.main,
        name: input.name,
        slug: slug(input.name),
        Wall: { connect: { id: input.wallId } },
        image: {
          create: input.image,
        },
        Author: { connect: { email: ctx.user.email } },
      },
    }),
  ),
});
