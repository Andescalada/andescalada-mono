import { SectorKindSchema } from "@andescalada/db/zod";

type SectorKindObject = { [key in typeof SectorKindSchema._type]: any };

export const sectorKindAssets = {
  [SectorKindSchema.Enum.Boulder]: {
    label: "Bloque",
    labelLowerCase: "bloque",
    nameOf: "Nombre del bloque",
    noneMessage: "No hay bloques",
    add: "Agregar bloque",
    deletedMessage: (name: string) => `Bloque "${name}" eliminado`,
    delete: "Eliminar bloque",
    confirmDelete: "¿Estás seguro de que quieres eliminar este bloque?",
  },
  [SectorKindSchema.Enum.Wall]: {
    label: "Pared",
    labelLowerCase: "pared",
    nameOf: "Nombre de la pared",
    noneMessage: "No hay paredes",
    add: "Agregar pared",
    deletedMessage: (name: string) => `Pared "${name}" eliminada`,
    delete: "Eliminar pared",
    confirmDelete: "¿Estás seguro de que quieres eliminar esta pared?",
  },
  [SectorKindSchema.Enum.Waterfall]: {
    label: "Cascada",
    labelLowerCase: "cascada",
    nameOf: "Nombre de la cascada",
    noneMessage: "No hay cascadas",
    add: "Agregar cascada",
    deletedMessage: (name: string) => `Cascada "${name}" eliminada`,
    delete: "Eliminar cascada",
    confirmDelete: "¿Estás seguro de que quieres eliminar esta cascada?",
  },
} satisfies SectorKindObject;
