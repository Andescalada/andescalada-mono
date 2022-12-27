import { StatusSchema } from "@andescalada/db/zod";
import { Colors } from "@andescalada/ui";

const zoneStatus = (
  status: typeof StatusSchema._type,
): { label: string; color: Colors; backgroundColor: Colors } => {
  switch (status) {
    case StatusSchema.Enum.Unpublished:
      return {
        label: "No publicada",
        color: "grayscale.black",
        backgroundColor: "semantic.warning",
      };
    case StatusSchema.Enum.Published:
      return {
        label: "Publicada",
        color: "grayscale.white",
        backgroundColor: "semantic.info",
      };
    case StatusSchema.Enum.Approved:
      return {
        label: "Aprobada",
        color: "grayscale.white",
        backgroundColor: "semantic.success",
      };
    case StatusSchema.Enum.Rejected:
      return {
        label: "Rechazada",
        color: "grayscale.white",
        backgroundColor: "semantic.success",
      };
    case StatusSchema.Enum.Paused:
      return {
        label: "Pausada",
        color: "grayscale.white",
        backgroundColor: "grayscale.600",
      };
    case StatusSchema.Enum.InReview:
      return {
        label: "Pausada",
        color: "grayscale.white",
        backgroundColor: "brand.primaryA",
      };
    default:
      throw new Error(`Invalid zone status: ${status}`);
  }
};

export default zoneStatus;
