import wall from "@andescalada/api/schemas/wall";
import { includeInTopo } from "@andescalada/api/src/routers/topos";
import { protectedZoneProcedure } from "@andescalada/api/src/utils/protectedZoneProcedure";

export const toposByUser = protectedZoneProcedure
  .input(wall.id)
  .query(({ ctx, input }) => {
    return ctx.prisma.topo.findMany({
      where: { wallId: input.wallId, Author: { id: ctx.user.id } },
      include: {
        ...includeInTopo,
        Verification: true,
        Wall: {
          include: {
            Sector: {
              include: { Zone: { select: { name: true, id: true } } },
            },
          },
        },
        Author: {
          select: {
            id: true,
            name: true,
            username: true,
            profilePhoto: true,
          },
        },
      },
    });
  });

export const toposByUserCount = protectedZoneProcedure
  .input(wall.id)
  .query(({ ctx, input }) => {
    return ctx.prisma.topo.count({
      where: { wallId: input.wallId, Author: { id: ctx.user.id } },
    });
  });
