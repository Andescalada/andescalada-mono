import { InfoAccessSchema } from "@andescalada/db/zod";

const infoAccess = (infoAccess: typeof InfoAccessSchema._type) => {
  switch (infoAccess) {
    case InfoAccessSchema.Enum.Public:
      return {
        label: "Pública",
        descriptionTitle: "Guía pública",
        accessDescription: "Cualquier persona tiene acceso a la guía.",
        editionDescription:
          "La información de la guía solo puede ser modificada por personas que tú u otros administradores definan como administradores, editores o colaboradores.",
        color: "semantic.success" as const,
      };
    case InfoAccessSchema.Enum.Community:
      return {
        label: "Comunitaria",
        descriptionTitle: "Guía comunitaria",
        accessDescription:
          "Cualquier persona que tiene acceso a la guía, puede entregar acceso a la guía.",
        editionDescription:
          "La información de la guía solo puede ser modificada por personas que tú u otros administradores definan como administradores, editores o colaboradores.",
        color: "semantic.warning" as const,
      };
    case InfoAccessSchema.Enum.Private:
      return {
        label: "Privada",
        descriptionTitle: "Guía privada",
        accessDescription:
          "Solo tú y personas que definas como administradores pueden entregar acceso a la guía.",
        editionDescription:
          "La información de la guía solo puede ser modificada por personas que tú definas como administradores, editores o colaboradores.",
        color: "private" as const,
      };
  }
};

export default infoAccess;
