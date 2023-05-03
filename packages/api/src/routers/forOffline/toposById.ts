import topo from "@andescalada/api/schemas/topo";
import { protectedZoneProcedure } from "@andescalada/api/src/utils/protectedZoneProcedure";
import { SoftDelete } from "@prisma/client";
import { TRPCError } from "@trpc/server";

const toposById = protectedZoneProcedure
  .input(topo.id)
  .query(async ({ ctx, input }) => {
    const topo = await ctx.prisma.topo.findUnique({
      where: { id: input.topoId },
      include: {
        Wall: { select: { Sector: { select: { sectorKind: true } } } },
        RoutePath: {
          where: {
            Route: {
              AND: [
                { isDeleted: SoftDelete.NotDeleted },
                {
                  OR: [
                    {
                      Pitch: {
                        MultiPitch: { isDeleted: SoftDelete.NotDeleted },
                      },
                    },

                    { Pitch: null },
                  ],
                },
                {
                  OR: [
                    { Pitch: { isDeleted: SoftDelete.NotDeleted } },
                    { Pitch: null },
                  ],
                },
              ],
            },
          },
          orderBy: { Route: { Pitch: { number: "desc" } } },
          include: {
            Route: {
              select: {
                id: true,
                position: true,
                extendedRouteId: true,
                kind: true,
                name: true,
                RouteGrade: true,
                Pitch: { select: { number: true } },
              },
            },
          },
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
  });

export default toposById;
