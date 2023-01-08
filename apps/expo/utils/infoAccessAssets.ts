import { InfoAccessSchema } from "@andescalada/db/zod";
import { Colors } from "@andescalada/ui";

interface InfoAccessAssetsItem {
  label: string;
  descriptionTitle: string;
  accessDescription: string;
  editionDescription: string;
  requestTitle: string;
  requestDescription: string;
  backgroundColor: Colors;
  color: Colors;
}

type InfoAccessAssets = {
  [key in keyof typeof InfoAccessSchema.Enum]: InfoAccessAssetsItem;
};

const infoAccessAssets = {
  [InfoAccessSchema.Enum.Public]: {
    label: "Pública",
    descriptionTitle: "Guía pública",
    accessDescription: "Cualquier persona tiene acceso a la guía.",
    editionDescription:
      "La información de la guía solo puede ser modificada por personas que tú u otros administradores definan como administradores, editores o colaboradores.",
    backgroundColor: "brand.primaryB",
    color: "grayscale.white",
    requestTitle: "Acceso Público",
    requestDescription:
      "No es necesario pedir acceso a la guía, cualquier persona puede acceder a ella.",
  },
  [InfoAccessSchema.Enum.Community]: {
    label: "Comunitaria",
    descriptionTitle: "Guía comunitaria",
    accessDescription:
      "Cualquier persona que tiene acceso a la guía, puede entregar acceso a la guía.",
    editionDescription:
      "La información de la guía solo puede ser modificada por personas que tú u otros administradores definan como administradores, editores o colaboradores.",
    backgroundColor: "brand.secondaryA",
    color: "grayscale.black",
    requestTitle: "Acceso Comunitario",
    requestDescription:
      "Cualquier persona que ya tenga acceso a estos topos puede entregarte acceso.",
  },
  [InfoAccessSchema.Enum.Private]: {
    label: "Privada",
    descriptionTitle: "Guía privada",
    accessDescription:
      "Solo tú y personas que definas como administradores pueden entregar acceso a la guía.",
    editionDescription:
      "La información de la guía solo puede ser modificada por personas que tú definas como administradores, editores o colaboradores.",
    backgroundColor: "private",
    color: "grayscale.white",
    requestTitle: "Acceso Privado",
    requestDescription:
      "Solo los y las administradoras de la zona pueden darte acceso.",
  },
} satisfies InfoAccessAssets;

export default infoAccessAssets;
