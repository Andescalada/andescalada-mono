import { AgreementLevelSchema } from "@andescalada/db/zod";
import { Colors } from "@andescalada/ui";

const agreementLevel = (
  level: typeof AgreementLevelSchema._type,
): { color: Colors; backgroundColor: Colors; label: string } => {
  switch (level) {
    case AgreementLevelSchema.Enum.Critical:
      return {
        color: "grayscale.white",
        backgroundColor: "semantic.error",
        label: "Crítico",
      };
    case AgreementLevelSchema.Enum.Important:
      return {
        color: "grayscale.black",
        backgroundColor: "semantic.warning",
        label: "Importante",
      };
    case AgreementLevelSchema.Enum.Recommended:
      return {
        color: "grayscale.white",
        backgroundColor: "semantic.info",
        label: "Recomendado",
      };
    case AgreementLevelSchema.Enum.NotAplicable:
      return {
        color: "grayscale.white",
        backgroundColor: "grayscale.800",
        label: "No aplica",
      };

    default:
      throw new Error("Agreement level not valid");
  }
};

export default agreementLevel;
