import { Box, Pressable, Text } from "@andescalada/ui";
import {
  ZoneManagerRouteProps,
  ZoneManagerRoutes,
} from "@features/zoneManager/Navigation/types";
import usePermissions from "@hooks/usePermissions";
import { useRoute } from "@react-navigation/native";
import { useNotifications } from "@utils/notificated";
import { FC, useMemo } from "react";

interface Props {
  reviewers:
    | {
        name: string;
        id: string;
        username: string;
      }[]
    | undefined;
}

const ReviewersList: FC<Props> = ({ reviewers }) => {
  const {
    params: { zoneId },
  } = useRoute<ZoneManagerRouteProps<ZoneManagerRoutes.EditZoneStatus>>();

  const { permission } = usePermissions({ zoneId });

  const showRemoveAsReviewer = useMemo(
    () => permission?.has("ApproveZone") || permission?.has("RejectZone"),
    [permission],
  );

  const { notify } = useNotifications();

  if (reviewers?.length === 0) {
    return (
      <Box>
        <Text variant="h4">Sin revisores</Text>
      </Box>
    );
  }
  if (reviewers && reviewers?.length > 0)
    return (
      <Box>
        <Text variant="h4">Revisores:</Text>
        {reviewers.map((item) => (
          <Box key={item.id}>
            <Text variant="p1R">{`• ${item.username}`}</Text>
          </Box>
        ))}
        {showRemoveAsReviewer && (
          <Pressable
            marginTop="s"
            onPress={() => {
              notify("warning", {
                params: {
                  title: "Contacta a un administrador de Andescalada",
                  description:
                    "Para removerte como revisor debes contactar directamente a un administrador de Andescalada",
                  hideCloseButton: true,
                },
                config: { duration: 5000 },
              });
            }}
          >
            <Text color="semantic.error" textDecorationLine="underline">
              Removerme como revisor
            </Text>
          </Pressable>
        )}
      </Box>
    );

  return <Box />;
};

export default ReviewersList;
