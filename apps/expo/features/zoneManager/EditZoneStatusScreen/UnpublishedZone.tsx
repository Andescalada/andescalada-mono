import { StatusSchema } from "@andescalada/db/zod";
import { Box, Button, TextFieldAccordion } from "@andescalada/ui";
import { TextFieldAccordionRef } from "@andescalada/ui/TextFieldAccordion/TextFieldAccordion";
import { trpc } from "@andescalada/utils/trpc";
import {
  ZoneManagerRouteProps,
  ZoneManagerRoutes,
} from "@features/zoneManager/Navigation/types";
import usePermissions from "@hooks/usePermissions";
import { useRoute } from "@react-navigation/native";
import { useNotifications } from "@utils/notificated";
import { FC, useRef, useState } from "react";
import { z } from "zod";

interface Props {
  status: typeof StatusSchema._type | undefined;
}

const UnpublishedZone: FC<Props> = ({ status }) => {
  const {
    params: { zoneId },
  } = useRoute<ZoneManagerRouteProps<ZoneManagerRoutes.EditZoneStatus>>();

  const { permission } = usePermissions({ zoneId });

  const utils = trpc.useContext();

  const unpublishZone = trpc.zoneReview.unpublishZone.useMutation({
    onSuccess: () => {
      utils.zoneReview.invalidate();
      utils.zones.invalidate();
    },
  });

  const [message, setMessage] = useState("");

  const textFieldAccordionRef = useRef<TextFieldAccordionRef>(null);

  const { notify } = useNotifications();

  if (
    !status ||
    (status !== StatusSchema.Enum.Published &&
      status !== StatusSchema.Enum.Paused) ||
    !permission?.has("UnpublishZone")
  )
    return <Box />;
  return (
    <Box>
      <TextFieldAccordion
        label="Agregar mensaje"
        value={message}
        onChangeText={setMessage}
        marginBottom="m"
        ref={textFieldAccordionRef}
      />
      <Button
        variant="warning"
        padding="m"
        title="Despublicar"
        disabled={unpublishZone.isLoading}
        isLoading={unpublishZone.isLoading}
        onPress={() => {
          const isValid = z
            .string()
            .min(10)
            .max(280)
            .safeParse(message).success;
          if (!isValid) {
            textFieldAccordionRef.current?.expand();
            textFieldAccordionRef.current?.focus();
            notify("error", {
              params: {
                title: "Ingresar correcciones",
                description:
                  "Indica al admin la razón de la despublicación de la zona, mínimo 10 caracteres y máximo 280",
                hideCloseButton: true,
              },
            });
            return;
          }
          unpublishZone.mutate({
            zoneId,
            message: message,
          });
        }}
      />
    </Box>
  );
};

export default UnpublishedZone;
