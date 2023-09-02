import { StatusSchema } from "@andescalada/db/zod";
import { Box, Button } from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import {
  ZoneManagerRouteProps,
  ZoneManagerRoutes,
} from "@features/zoneManager/Navigation/types";
import usePermissions from "@hooks/usePermissions";
import { useRoute } from "@react-navigation/native";
import { FC } from "react";

interface Props {
  status?: typeof StatusSchema._type;
}

const SelfAssignReview: FC<Props> = ({ status }) => {
  const {
    params: { zoneId },
  } = useRoute<ZoneManagerRouteProps<ZoneManagerRoutes.EditZoneStatus>>();

  const { permission } = usePermissions({ zoneId });

  const utils = trpc.useContext();
  const selfAssignZoneToReview = trpc.user.selfAssignZoneToReview.useMutation({
    onSuccess: () => {
      utils.user.invalidate();
      utils.zones.invalidate();
    },
  });

  if (
    (!permission?.has("ApproveZone") || !permission?.has("RejectZone")) &&
    status === StatusSchema.Enum.InReview
  )
    return (
      <Button
        marginTop="m"
        variant="info"
        padding="m"
        title="Revisar zona"
        isLoading={selfAssignZoneToReview.isLoading}
        disabled={selfAssignZoneToReview.isLoading}
        onPress={() => {
          selfAssignZoneToReview.mutate({ zoneId });
        }}
      />
    );

  return <Box />;
};

export default SelfAssignReview;
