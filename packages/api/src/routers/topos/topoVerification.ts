import topo from "@andescalada/api/schemas/topo";
import zone from "@andescalada/api/schemas/zone";
import { includeInTopo } from "@andescalada/api/src/routers/topos";
import error from "@andescalada/api/src/utils/errors";
import { protectedZoneProcedure } from "@andescalada/api/src/utils/protectedZoneProcedure";
import { TRPCError } from "@trpc/server";

import { VerificationStatus } from ".prisma/client";

export const toposToVerify = protectedZoneProcedure
  .input(zone.id)
  .query(async ({ input, ctx }) => {
    if (!ctx.permissions.has("MakeTopoVerification")) {
      throw new TRPCError(
        error.unauthorizedActionForZone(input.zoneId, "MakeTopoVerification"),
      );
    }
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
    if (!ctx.permissions.has("MakeTopoVerification")) {
      throw new TRPCError(
        error.unauthorizedActionForZone(input.zoneId, "MakeTopoVerification"),
      );
    }
    return ctx.prisma.topo.update({
      where: { id: input.topoId },
      data: {
        Verification: {
          update: {
            status: VerificationStatus.Approved,
            VerifierUser: { connect: { id: ctx.user.id } },
          },
        },
      },
    });
  });

export const rejectTopo = protectedZoneProcedure
  .input(topo.id)
  .mutation(({ ctx, input }) => {
    if (!ctx.permissions.has("MakeTopoVerification")) {
      throw new TRPCError(
        error.unauthorizedActionForZone(input.zoneId, "MakeTopoVerification"),
      );
    }
    return ctx.prisma.topo.update({
      where: { id: input.topoId },
      data: {
        Verification: {
          update: {
            status: VerificationStatus.Rejected,
            VerifierUser: { connect: { id: ctx.user.id } },
          },
        },
      },
    });
  });

export const numberOfToposToVerify = protectedZoneProcedure
  .input(zone.id)
  .query(({ ctx, input }) => {
    return ctx.prisma.topo.count({
      where: {
        Wall: { Sector: { Zone: { id: input.zoneId } } },
        Verification: { status: VerificationStatus.Pending },
        UserPhotoContestTopo: { every: { isSubmitted: true } },
      },
    });
  });
