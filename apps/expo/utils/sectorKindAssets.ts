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
    onDeleteError: "No se pudo eliminar el bloque, inténtalo de nuevo",
    confirmDelete: "¿Estás seguro de que quieres eliminar este bloque?",
    info: "Optimiza la experiencia para un sector de boulder.",
  },
  [SectorKindSchema.Enum.Wall]: {
    label: "Pared",
    labelLowerCase: "pared",
    nameOf: "Nombre de la pared",
    noneMessage: "No hay paredes",
    add: "Agregar pared",
    deletedMessage: (name: string) => `Pared "${name}" eliminada`,
    onDeleteError: "No se pudo eliminar la pared, inténtalo de nuevo",
    delete: "Eliminar pared",
    confirmDelete: "¿Estás seguro de que quieres eliminar esta pared?",
    info: "Optimiza la experiencia para un sector de mono largos.",
  },
  [SectorKindSchema.Enum.BigWall]: {
    label: "Gran Pared",
    labelLowerCase: "gran pared",
    nameOf: "Nombre de la pared",
    noneMessage: "No hay paredes",
    add: "Agregar pared",
    deletedMessage: (name: string) => `Pared "${name}" eliminada`,
    onDeleteError: "No se pudo eliminar la pared, inténtalo de nuevo",
    delete: "Eliminar pared",
    confirmDelete: "¿Estás seguro de que quieres eliminar esta pared?",
    info: "Optimiza la experiencia para un sector de multi largos, las imágenes se mostrarán en mayor resolución.",
  },
  [SectorKindSchema.Enum.Waterfall]: {
    label: "Cascada",
    labelLowerCase: "cascada",
    nameOf: "Nombre de la cascada",
    noneMessage: "No hay cascadas",
    add: "Agregar cascada",
    deletedMessage: (name: string) => `Cascada "${name}" eliminada`,
    delete: "Eliminar cascada",
    onDeleteError: "No se pudo eliminar la cascada, inténtalo de nuevo",
    confirmDelete: "¿Estás seguro de que quieres eliminar esta cascada?",
    info: "Optimiza la experiencia para un sector de escalada en hielo.",
  },
} satisfies SectorKindObject;
