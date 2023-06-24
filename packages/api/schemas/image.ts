// import { StorageService } from "@andescalada/db";
import { z } from "zod";

export enum StorageService {
  Cloudinary = "Cloudinary",
}

const schema = z.object({
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

export default { schema };
