import image from "@andescalada/api/schemas/image";
import { protectedProcedure } from "@andescalada/api/src/utils/protectedProcedure";
import { v2 as cloudinary } from "cloudinary";
import { z } from "zod";

import { t } from "../createRouter";

export const imagesRouter = t.router({
  sign: protectedProcedure
    .input(z.object({ uploadPreset: z.string() }))
    .query(({ input }) => {
      const timestamp = Math.round(new Date().getTime() / 1000);

      const signature = cloudinary.utils.api_sign_request(
        {
          timestamp: timestamp,
          upload_preset: input.uploadPreset,
        },
        process.env.CLOUDINARY_API_SECRET as string,
      );

      return { timestamp, signature };
    }),
  save: protectedProcedure
    .input(z.object({ image: image.schema }))
    .mutation(({ ctx, input }) => {
      const { image } = input;

      return ctx.prisma.image.create({
        data: {
          ...image,
          User: {
            connect: { id: ctx.user.id },
          },
        },
      });
    }),
});
