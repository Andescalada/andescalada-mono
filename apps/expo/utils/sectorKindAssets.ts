import { SectorKindSchema } from "@andescalada/db/zod";

type SectorKindObject = { [key in typeof SectorKindSchema._type]: any };

export const sectorKindAssets = {
  [SectorKindSchema.Enum.Boulder]: {
    label: "Boulder",
  },
  [SectorKindSchema.Enum.Wall]: {
    label: "Pared",
  },
  [SectorKindSchema.Enum.Waterfall]: {
    label: "Cascada",
  },
} satisfies SectorKindObject;
