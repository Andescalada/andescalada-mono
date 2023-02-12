import { protectedProcedure } from "@andescalada/api/src/utils/protectedProcedure";
import { v2 as cloudinary } from "cloudinary";
import { z } from "zod";

import { t } from "../createRouter";

const config = cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const imagesRouter = t.router({
  sign: protectedProcedure.query(() => {
    const timestamp = Math.round(new Date().getTime() / 1000);

    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp: timestamp,
      },
      config.apiSecret,
    );

    return { timestamp, signature };
  }),
});
