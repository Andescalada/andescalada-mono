import { StatusSchema } from "@andescalada/db/zod";
import { A, Box, Button, TextFieldAccordion } from "@andescalada/ui";
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
import { FadeIn, FadeOut } from "react-native-reanimated";
import { z } from "zod";

interface Props {
  status: typeof StatusSchema._type | undefined;
}

const ApproveOrRejectZone: FC<Props> = ({ status }) => {
  const {
    params: { zoneId },
  } = useRoute<ZoneManagerRouteProps<ZoneManagerRoutes.EditZoneStatus>>();
  const { permission } = usePermissions({ zoneId });
  const utils = trpc.useContext();
  const approveZone = trpc.zoneReview.approveZoneReview.useMutation({
    onSuccess: () => {
      utils.zoneReview.invalidate();
      utils.zones.invalidate();
    },
  });
  const rejectZone = trpc.zoneReview.rejectZoneReview.useMutation({
    onSuccess: () => {
      utils.zoneReview.invalidate();
      utils.zones.invalidate();
    },
  });

  const [message, setMessage] = useState("");

  const textFieldAccordionRef = useRef<TextFieldAccordionRef>(null);

  const { notify } = useNotifications();

  if (!status || status !== StatusSchema.Enum.InReview) return <Box />;

  return (
    <A.Box entering={FadeIn} exiting={FadeOut}>
      {(permission?.has("ApproveZone") || permission?.has("RejectZone")) && (
        <TextFieldAccordion
          label="Agregar mensaje"
          value={message}
          onChangeText={setMessage}
          marginBottom="m"
          ref={textFieldAccordionRef}
        />
      )}
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-evenly"
      >
        {permission?.has("ApproveZone") && (
          <Button
            variant="success"
            padding="m"
            title="Aprobar"
            disabled={rejectZone.isLoading || approveZone.isLoading}
            isLoading={approveZone.isLoading}
            onPress={() => {
              const isValid = z
                .string()
                .max(280)
                .optional()
                .safeParse(message).success;
              if (!isValid) return;
              approveZone.mutate({
                zoneId,
                status: StatusSchema.Enum.Approved,
                message: message,
              });
            }}
          />
        )}
        {permission?.has("RejectZone") && (
          <Button
            variant="error"
            padding="m"
            title="Rechazar"
            disabled={rejectZone.isLoading || approveZone.isLoading}
            isLoading={rejectZone.isLoading}
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
                      "Indica al admin de esta zona las correcciones que debe realizar, mínimo 10 caracteres y máximo 280",
                    hideCloseButton: true,
                  },
                });
                return;
              }
              rejectZone.mutate({
                zoneId,
                status: StatusSchema.Enum.Rejected,
                message: message,
              });
            }}
          />
        )}
      </Box>
    </A.Box>
  );
};

export default ApproveOrRejectZone;
