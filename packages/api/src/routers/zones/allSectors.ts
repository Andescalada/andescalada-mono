import error from "@andescalada/api/src/utils/errors";
import { GlobalRoles } from "@andescalada/api/src/utils/globalRoles";
import { protectedZoneProcedure } from "@andescalada/api/src/utils/protectedZoneProcedure";
import { Prisma, RoleNames, SoftDelete } from "@andescalada/db";
import { TRPCError } from "@trpc/server";

// Procedure being downloaded
const allSectors = protectedZoneProcedure.query(async ({ ctx, input }) => {
  const res = await ctx.prisma.zone.findUnique({
    where: { id: input.zoneId },
    select: selectZoneAllSectors({ userId: ctx.user.id }),
  });
  if (!res || res?.isDeleted !== SoftDelete.NotDeleted) {
    throw new TRPCError(error.sectorNotFound(input.zoneId));
  }

  if (
    res.infoAccess !== "Public" &&
    !ctx.permissions.has("Read") &&
    !ctx.verifiedUser?.permissions?.includes(GlobalRoles.REVIEW_ZONE)
  ) {
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

export const selectZoneAllSectors = ({ userId }: { userId: string }) =>
  ({
    _count: true,
    id: true,
    version: true,
    name: true,
    searchVisibility: true,
    isDeleted: true,
    Location: true,
    sectors: {
      where: { isDeleted: SoftDelete.NotDeleted },
      include: {
        _count: true,
        Location: { select: { latitude: true, longitude: true } },
        walls: {
          where: { isDeleted: SoftDelete.NotDeleted },
          select: {
            name: true,
            id: true,
            _count: true,
          },
          orderBy: { position: "asc" as const },
        },
      },
    },
    description: { select: { originalText: true } },
    infoAccess: true,
    currentStatus: true,
    RoleByZone: {
      where: { Role: { isNot: { name: RoleNames.Reviewer } } },
      distinct: ["userId"],
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
    DownloadedBy: { where: { id: userId } },
    FavoritedBy: { where: { id: userId } },
    ZoneAccessRequest: {
      where: {
        User: { id: userId },
      },
      orderBy: { createdAt: "desc" as const },
      take: 1,
      select: { status: true },
    },
    UserZoneAgreementHistory: {
      where: {
        User: { id: userId },
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
  } satisfies Prisma.ZoneSelect);
