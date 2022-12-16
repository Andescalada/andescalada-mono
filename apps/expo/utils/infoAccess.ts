import { InfoAccessSchema } from "@andescalada/db/zod";
import { Colors } from "@andescalada/ui";

const infoAccess = (infoAccess: typeof InfoAccessSchema._type) => {
  switch (infoAccess) {
    case InfoAccessSchema.Enum.Public:
      return {
        label: "Pública",
        descriptionTitle: "Guía pública",
        accessDescription: "Cualquier persona tiene acceso a la guía.",
        editionDescription:
          "La información de la guía solo puede ser modificada por personas que tú u otros administradores definan como administradores, editores o colaboradores.",
        backgroundColor: "brand.primaryB" as Colors,
        color: "grayscale.white" as Colors,
      };
    case InfoAccessSchema.Enum.Community:
      return {
        label: "Comunitaria",
        descriptionTitle: "Guía comunitaria",
        accessDescription:
          "Cualquier persona que tiene acceso a la guía, puede entregar acceso a la guía.",
        editionDescription:
          "La información de la guía solo puede ser modificada por personas que tú u otros administradores definan como administradores, editores o colaboradores.",
        backgroundColor: "brand.secondaryA" as Colors,
        color: "grayscale.black" as Colors,
      };
    case InfoAccessSchema.Enum.Private:
      return {
        label: "Privada",
        descriptionTitle: "Guía privada",
        accessDescription:
          "Solo tú y personas que definas como administradores pueden entregar acceso a la guía.",
        editionDescription:
          "La información de la guía solo puede ser modificada por personas que tú definas como administradores, editores o colaboradores.",
        backgroundColor: "private" as const,
        color: "grayscale.white" as Colors,
      };
  }
};

export default infoAccess;
