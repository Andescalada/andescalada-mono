import { isDefined } from "utils/filterGuards";
import getOfflineAssets, { AssetsToUpdate } from "utils/getOfflineAssets";
import { protectedProcedure } from "utils/protectedProcedure";
import { z } from "zod";

const AssetsToUpdateZod = z.object({
  zones: z
    .array(z.object({ zoneId: z.string(), assets: AssetsToUpdate }))
    .optional(),
});

const updateDownloadedAssets = protectedProcedure
  .input(AssetsToUpdateZod)
  .mutation(async ({ ctx, input }) => {
    if (!input.zones) return null;

    const assetsToReturn = input.zones.map(async ({ zoneId, assets }) => {
      const zone = await ctx.prisma.zone.findUniqueOrThrow({
        where: { id: zoneId },
        select: { name: true },
      });
      const data = await getOfflineAssets({
        ctx,
        input: { zoneId, assetsToUpdate: assets },
      });
      return { zoneId, data, zoneName: zone.name };
    });

    const assets = await Promise.allSettled(assetsToReturn);

    const assetsToUpdate = assets
      .map((a) => {
        if (a.status === "fulfilled") return a.value;
        return undefined;
      })
      .filter(isDefined);

    return assetsToUpdate;
  });

export default updateDownloadedAssets;
