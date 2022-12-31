import { StatusSchema } from "@andescalada/db/zod";
import {
  ActivityIndicator,
  Box,
  Button,
  Screen,
  ScrollView,
  Text,
} from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import ActionByStatus from "@features/zoneManager/EditZoneStatusScreen/ActionByStatus";
import ApproveOrRejectZone from "@features/zoneManager/EditZoneStatusScreen/ApproveOrRejectZone";
import {
  ZoneManagerRoutes,
  ZoneManagerScreenProps,
} from "@features/zoneManager/Navigation/types";
import useGlobalPermissions from "@hooks/useGlobalPermissions";
import usePermissions from "@hooks/usePermissions";
import { GlobalPermissions } from "@utils/auth0/types";
import zoneStatus from "@utils/zoneStatus";
import { FC, useMemo, useState } from "react";
import { z } from "zod";

type Props = ZoneManagerScreenProps<ZoneManagerRoutes.EditZoneStatus>;

const EditZoneStatus: FC<Props> = ({
  route: {
    params: { zoneId, zoneName },
  },
}) => {
  const { data, isLoading, isFetching } = trpc.zones.statusById.useQuery(
    {
      zoneId,
    },
    { staleTime: 1000 * 60, cacheTime: 1000 },
  );

  const globalPermissions = useGlobalPermissions();
  const { permission } = usePermissions({ zoneId });

  const reviewers = useMemo(
    () => data?.RoleByZone.map((r) => r.User),
    [data?.RoleByZone],
  );

  const utils = trpc.useContext();

  const requestRevision = trpc.zoneReview.requestRevision.useMutation({
    onSuccess: () => {
      utils.zones.statusById.invalidate({ zoneId });
    },
  });

  const selfAssignZoneToReview = trpc.user.selfAssignZoneToReview.useMutation({
    onSuccess: () => {
      utils.user.invalidate();
      utils.zones.invalidate();
    },
  });

  const publishZone = trpc.zoneReview.publishZone.useMutation({
    onSuccess: () => {
      utils.zoneReview.invalidate();
      utils.zones.invalidate();
    },
  });

  const pauseZonePublication = trpc.zoneReview.pauseZonePublication.useMutation(
    {
      onSuccess: () => {
        utils.zoneReview.invalidate();
        utils.zones.invalidate();
      },
    },
  );

  const [message, setMessage] = useState("");

  if (isLoading || isFetching)
    return (
      <Screen safeAreaDisabled padding="m">
        <Text variant="h1" marginBottom="m">
          {zoneName}
        </Text>
        <Box flex={1} justifyContent="center" alignItems="center">
          <ActivityIndicator size="large" />
        </Box>
      </Screen>
    );

  return (
    <Screen safeAreaDisabled padding="m">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text variant="h1" marginBottom="m">
          {zoneName}
        </Text>
        {data && (
          <>
            <Text variant="h4" marginBottom="s">
              La zona se encuentra:
            </Text>

            <Box
              marginBottom="s"
              padding="s"
              backgroundColor={zoneStatus(data.currentStatus).backgroundColor}
              borderRadius={16}
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              paddingVertical="m"
            >
              <Text color={zoneStatus(data.currentStatus).color}>
                {zoneStatus(data.currentStatus).label}
              </Text>
            </Box>
            <ActionByStatus
              status={data.currentStatus}
              message={message}
              setMessage={setMessage}
              visible={
                !!permission?.has("RequestZoneReview") &&
                data.currentStatus === StatusSchema.Enum.InReview
              }
              isLoading={requestRevision.isLoading}
              disabled={requestRevision.isLoading}
              onPress={() => {
                const isValid = z.string().max(280).safeParse(message).success;
                if (!isValid) return;
                requestRevision.mutate({ zoneId, message });
              }}
            />
            <ActionByStatus
              status={data.currentStatus}
              message={message}
              setMessage={setMessage}
              visible={
                !!permission?.has("PublishZone") &&
                (data.currentStatus === StatusSchema.Enum.Approved ||
                  data.currentStatus === StatusSchema.Enum.Paused)
              }
              isLoading={publishZone.isLoading}
              disabled={publishZone.isLoading}
              onPress={() => {
                const isValid = z.string().max(280).safeParse(message).success;
                if (!isValid) return;
                publishZone.mutate({ zoneId, message });
              }}
            />
            <ActionByStatus
              status={data.currentStatus}
              message={message}
              setMessage={setMessage}
              visible={
                !!permission?.has("PauseZonePublication") &&
                data.currentStatus === StatusSchema.Enum.Published
              }
              isLoading={pauseZonePublication.isLoading}
              disabled={pauseZonePublication.isLoading}
              onPress={() => {
                const isValid = z.string().max(280).safeParse(message).success;
                if (!isValid) return;
                pauseZonePublication.mutate({ zoneId, message });
              }}
            />
          </>
        )}
        {globalPermissions?.includes(GlobalPermissions.REVIEW_ZONE) && (
          <Box
            borderWidth={2}
            borderColor="brand.primaryA"
            borderRadius={16}
            padding="m"
            marginVertical="m"
            borderStyle="dashed"
          >
            <Text variant="h3" color="brand.primaryA">
              Sección para revisores
            </Text>
            {reviewers?.length === 0 && (
              <Box>
                <Text variant="h4">Sin revisores</Text>
              </Box>
            )}
            {reviewers && reviewers?.length > 0 && (
              <Box>
                <Text variant="h4">Revisores:</Text>
                {reviewers.map((item) => (
                  <Box key={item.id}>
                    <Text variant="p1R">{`• ${item.username}`}</Text>
                  </Box>
                ))}
              </Box>
            )}
            {(!permission?.has("ApproveZone") ||
              !permission?.has("RejectZone")) &&
              data?.currentStatus === StatusSchema.Enum.InReview && (
                <Button
                  marginTop="m"
                  variant="info"
                  title="Revisar zona"
                  isLoading={selfAssignZoneToReview.isLoading}
                  disabled={selfAssignZoneToReview.isLoading}
                  onPress={() => {
                    selfAssignZoneToReview.mutate({ zoneId });
                  }}
                />
              )}
            <ApproveOrRejectZone status={data?.currentStatus} />
          </Box>
        )}
      </ScrollView>
    </Screen>
  );
};

export default EditZoneStatus;
