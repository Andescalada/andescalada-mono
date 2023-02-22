import error from "@andescalada/api/src/utils/errors";
import { protectedZoneProcedure } from "@andescalada/api/src/utils/protectedZoneProcedure";
import { SoftDelete } from "@prisma/client";
import { TRPCError } from "@trpc/server";

// Procedure being downloaded
const allSectors = protectedZoneProcedure.query(async ({ ctx, input }) => {
  const res = await ctx.prisma.zone.findUnique({
    where: { id: input.zoneId },
    select: {
      name: true,
      isDeleted: true,
      ZoneAccessRequest: {
        where: {
          User: { email: ctx.user.email },
          Zone: { id: input.zoneId },
        },
        orderBy: { createdAt: "desc" },
        take: 1,
        select: { status: true },
      },
      UserZoneAgreementHistory: {
        where: {
          User: { email: ctx.user.email },
          Zone: { id: input.zoneId },
        },
        orderBy: { createdAt: "desc" },
        take: 1,
        select: { hasAgreed: true },
      },
      sectors: {
        where: { isDeleted: SoftDelete.NotDeleted },
        include: {
          walls: {
            where: { isDeleted: SoftDelete.NotDeleted },
            select: { name: true, id: true },
            orderBy: { position: "asc" },
          },
        },
      },
      description: { select: { originalText: true } },
      infoAccess: true,
      currentStatus: true,
      DownloadedBy: { where: { email: ctx.user.email } },
      FavoritedBy: { where: { email: ctx.user.email } },
      RoleByZone: {
        select: {
          User: {
            select: {
              id: true,
              profilePhoto: { select: { publicId: true } },
            },
          },
          Role: true,
        },
      },
    },
  });
  if (!res || res?.isDeleted !== SoftDelete.NotDeleted) {
    throw new TRPCError(error.sectorNotFound(input.zoneId));
  }

  if (res.infoAccess !== "Public" && !ctx.permissions.has("Read")) {
    return {
      ...res,
      sectors: undefined,
      hasAccess: false,
      isDownloaded: false,
      isFavorite: false,
    };
  }

  return {
    ...res,
    hasAccess: true,
    isDownloaded: res.DownloadedBy.length > 0,
    isFavorite: res.FavoritedBy.length > 0,
  };
});

export default allSectors;
