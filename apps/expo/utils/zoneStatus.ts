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
        nextStepTitle: "Pausar publicación",
        about:
          "Puedes pausar la publicación de la zona y dejará de aparecer en la lista de zonas. \n\n Si la zona está pausada, puedes volver a publicarla cuando quieras.",
      };
    case StatusSchema.Enum.Approved:
      return {
        label: "Aprobada",
        color: "grayscale.white",
        backgroundColor: "semantic.success",
        nextStepTitle: "Publicar",
        about:
          "Publica la guía de la zona para que todos la puedan encontrar y disfrutar.",
      };
    case StatusSchema.Enum.Rejected:
      return {
        label: "Rechazada",
        color: "grayscale.white",
        backgroundColor: "semantic.error",
        nextStepTitle: "Solicitar revisión",
        about:
          "Revisa los comentarios del revisor, corrígelos y solicita revisión de nuevo. \n\n Si consideras que las correcciones no son necesarias, puedes solicitar una revisión de nuevo y dejar un mensaje para los revisores.",
      };
    case StatusSchema.Enum.Paused:
      return {
        label: "Pausada",
        color: "grayscale.white",
        backgroundColor: "grayscale.600",
        nextStepTitle: "Publicar",
        about:
          "Publica la guía de la zona para que todos la puedan encontrar y disfrutar.",
      };
    case StatusSchema.Enum.InReview:
      return {
        label: "En revisión",
        color: "grayscale.white",
        backgroundColor: "brand.primaryA",
        about:
          "El equipo Andescalada está revisando la información de la zona para que la puedas publicar, en particular revisamos: \n\n - Que la zona no esté duplicada \n\n - No sea una zona con algún conflicto que conozcamos. \n\n - Se cumplan con los términos y condiciones de la Fundación.",
      };
    default:
      throw new Error(`Invalid zone status: ${status}`);
  }
};

export default zoneStatus;
