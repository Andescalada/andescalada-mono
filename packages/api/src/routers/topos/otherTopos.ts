import wall from "@andescalada/api/schemas/wall";
import { includeInTopo } from "@andescalada/api/src/routers/topos";
import error from "@andescalada/api/src/utils/errors";
import { protectedZoneProcedure } from "@andescalada/api/src/utils/protectedZoneProcedure";
import { TRPCError } from "@trpc/server";

import { InfoAccess, SoftDelete, VerificationStatus } from ".prisma/client";

export const otherTopos = protectedZoneProcedure
  .input(wall.id)
  .query(async ({ ctx, input }) => {
    const zone = await ctx.prisma.zone.findUniqueOrThrow({
      where: { id: input.zoneId },
      select: { infoAccess: true },
    });

    if (!ctx.permissions.has("Read") && zone.infoAccess !== InfoAccess.Public) {
      throw new TRPCError(
        error.unauthorizedActionForZone(input.zoneId, "Read"),
      );
    }
    const topos = await ctx.prisma.topo.findMany({
      where: {
        Wall: { id: input.wallId },
        Verification: { status: VerificationStatus.Approved },
        isDeleted: SoftDelete.NotDeleted,
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

export const otherToposCount = protectedZoneProcedure
  .input(wall.id)
  .query(async ({ ctx, input }) => {
    return ctx.prisma.topo.count({
      where: {
        wallId: input.wallId,
        main: false,
        Verification: { status: VerificationStatus.Approved },
        isDeleted: SoftDelete.NotDeleted,
      },
    });
  });
