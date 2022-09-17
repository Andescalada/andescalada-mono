import { StorageService } from '@prisma/client';
import { z } from 'zod';
import { t } from '../createRouter';

export const imageParser = z.object({
  name: z.string().optional(),
  url: z.string(),
  height: z.number(),
  width: z.number(),
  storageService: z.nativeEnum(StorageService),
  bytes: z.number().optional(),
  publicId: z.string(),
  version: z.number(),
  assetId: z.string(),
  format: z.string(),
});

export const zonesRouter = t.router({
  add: t.procedure
    .input(
      z.object({
        name: z.string(),
        url: z.string(),
        height: z.number(),
        width: z.number(),
        storageService: z.nativeEnum(StorageService),
        wallId: z.string(),
        bytes: z.number().optional(),
        publicId: z.string(),
        version: z.number(),
        assetId: z.string(),
        format: z.string(),
      }),
    )
    .query(({ ctx, input }) => ctx.prisma.image.create({ data: { ...input } })),
});
