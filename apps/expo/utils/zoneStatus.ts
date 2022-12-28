import { StatusSchema } from "@andescalada/db/zod";
import { Colors } from "@andescalada/ui";

const zoneStatus = (
  status: typeof StatusSchema._type,
): {
  label: string;
  color: Colors;
  backgroundColor: Colors;
  about?: string;
  nextStepTitle?: string;
} => {
  switch (status) {
    case StatusSchema.Enum.Unpublished:
      return {
        label: "No publicada",
        color: "grayscale.black",
        backgroundColor: "semantic.warning",
        nextStepTitle: "Solicitar revisión",
        about:
          "Cuando tú estimes conveniente, envía a revisión la zona. Entre más información agregues, más fácil será para los revisores aprobar tu zona.\n\n En caso de ser aprobada, podrás publicar cuando quieras la guía de la zona.\n\n En caso que sea rechazada, los revisores te dejarán un mensaje con las razones de rechazo para que hagas las correcciones. \n\n Al enviar la zona a revisión, puedes dejar un mensaje para los revisores.",
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
        label: "En revisión",
        color: "grayscale.white",
        backgroundColor: "brand.primaryA",
      };
    default:
      throw new Error(`Invalid zone status: ${status}`);
  }
};

export default zoneStatus;
