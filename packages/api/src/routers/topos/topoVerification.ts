import topo from "@andescalada/api/schemas/topo";
import zone from "@andescalada/api/schemas/zone";
import { includeInTopo } from "@andescalada/api/src/routers/topos";
import { protectedZoneProcedure } from "@andescalada/api/src/utils/protectedZoneProcedure";

import { VerificationStatus } from ".prisma/client";

export const toposToVerify = protectedZoneProcedure
  .input(zone.id)
  .query(async ({ input, ctx }) => {
    const topos = await ctx.prisma.topo.findMany({
      where: {
        Wall: { Sector: { Zone: { id: input.zoneId } } },
        Verification: { status: VerificationStatus.Pending },
        UserPhotoContestTopo: { every: { isSubmitted: true } },
      },
      include: {
        ...includeInTopo,
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

    return topos;
  });

export const approveTopo = protectedZoneProcedure
  .input(topo.id)
  .mutation(({ ctx, input }) => {
    return ctx.prisma.topo.update({
      where: { id: input.topoId },
      data: {
        Verification: { update: { status: VerificationStatus.Approved } },
      },
    });
  });

export const rejectTopo = protectedZoneProcedure
  .input(topo.id)
  .mutation(({ ctx, input }) => {
    return ctx.prisma.topo.update({
      where: { id: input.topoId },
      data: {
        Verification: { update: { status: VerificationStatus.Rejected } },
      },
    });
  });
