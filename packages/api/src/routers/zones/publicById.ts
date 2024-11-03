import { t } from "@andescalada/api/src/createRouter";
import { InfoAccess, SoftDelete } from "@andescalada/db";
import { z } from "zod";

const publicById = t.procedure
  .input(z.string())
  .query(async ({ ctx, input }) => {
    const { infoAccess } =
      (await ctx.prisma.zone.findUnique({
        where: { id: input },
        select: { infoAccess: true },
      })) || {};
    const zone = await ctx.prisma.zone.findUnique({
      where: { id: input },
      include: {
        description: { select: { originalText: true } },
        agreements: {
          orderBy: { level: "asc" },
          include: {
            Agreement: {
              include: {
                title: { select: { originalText: true } },
                description: { select: { originalText: true } },
                ZoneAgreement: {
                  where: { zoneId: input },
                  select: { comment: { select: { originalText: true } } },
                },
              },
            },
          },
        },
        sectors: {
          where: { isDeleted: SoftDelete.NotDeleted },
          take: infoAccess !== InfoAccess.Public ? 0 : undefined,
          include: {
            walls: {
              where: { isDeleted: SoftDelete.NotDeleted },
            },
          },
        },
      },
    });

    return zone;
  });

export default publicById;
