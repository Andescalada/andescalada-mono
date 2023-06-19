import error from "@andescalada/api/src/utils/errors";
import { protectedZoneProcedure } from "@andescalada/api/src/utils/protectedZoneProcedure";
import { SoftDelete } from "@prisma/client";
import { TRPCError } from "@trpc/server";

// Procedure being downloaded
const allSectors = protectedZoneProcedure.query(async ({ ctx, input }) => {
  const res = await ctx.prisma.zone.findUnique({
    where: { id: input.zoneId },
    select: selectZoneAllSectors({ userEmail: ctx.user.email }),
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
    isDownloaded: res.DownloadedBy && res.DownloadedBy.length > 0,
    isFavorite: res.FavoritedBy && res.FavoritedBy.length > 0,
  };
});

export default allSectors;

export const selectZoneAllSectors = ({ userEmail }: { userEmail: string }) => ({
  id: true,
  version: true,
  name: true,
  searchVisibility: true,
  isDeleted: true,
  Location: true,
  sectors: {
    where: { isDeleted: SoftDelete.NotDeleted },
    include: {
      walls: {
        where: { isDeleted: SoftDelete.NotDeleted },
        select: { name: true, id: true },
        orderBy: { position: "asc" as const },
      },
    },
  },
  description: { select: { originalText: true } },
  infoAccess: true,
  currentStatus: true,
  RoleByZone: {
    where: { User: { email: userEmail } },
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
  DownloadedBy: { where: { email: userEmail } },
  FavoritedBy: { where: { email: userEmail } },
  ZoneAccessRequest: {
    where: {
      User: { email: userEmail },
    },
    orderBy: { createdAt: "desc" as const },
    take: 1,
    select: { status: true },
  },
  UserZoneAgreementHistory: {
    where: {
      User: { email: userEmail },
    },
    orderBy: { createdAt: "desc" as const },
    take: 1,
    select: { hasAgreed: true },
  },
  agreements: {
    include: {
      Agreement: {
        include: {
          title: { select: { originalText: true } },
          description: { select: { originalText: true } },
          ZoneAgreement: {
            select: { comment: { select: { originalText: true } } },
          },
        },
      },
    },
  },
  ZoneDirections: {
    where: { isDeleted: SoftDelete.NotDeleted },
    orderBy: { createdAt: "desc" as const },
    include: {
      description: { select: { originalText: true } },
      name: { select: { originalText: true } },
    },
  },
});
