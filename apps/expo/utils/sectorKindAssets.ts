import { SectorKindSchema } from "@andescalada/db/zod";

type SectorKindObject = { [key in typeof SectorKindSchema._type]: any };

export const sectorKindAssets = {
  [SectorKindSchema.Enum.Boulder]: {
    label: "Boulder",
    nameOf: "Nombre del boulder",
    noneMessage: "No hay boulders",
    add: "Agregar boulder",
  },
  [SectorKindSchema.Enum.Wall]: {
    label: "Pared",
    nameOf: "Nombre de la pared",
    noneMessage: "No hay paredes",
    add: "Agregar pared",
  },
  [SectorKindSchema.Enum.Waterfall]: {
    label: "Cascada",
    nameOf: "Nombre de la cascada",
    noneMessage: "No hay cascadas",
    add: "Agregar cascada",
  },
} satisfies SectorKindObject;
