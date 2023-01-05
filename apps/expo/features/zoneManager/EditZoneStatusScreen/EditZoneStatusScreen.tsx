import { AppRouter } from "@andescalada/api/src/routers/_app";
import { StatusSchema } from "@andescalada/db/zod";
import {
  ActivityIndicator,
  Box,
  KeyboardAvoidingBox,
  KeyboardDismiss,
  Screen,
  ScrollView,
  Text,
} from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import ActionByStatus from "@features/zoneManager/EditZoneStatusScreen/ActionByStatus";
import ApproveOrRejectZone from "@features/zoneManager/EditZoneStatusScreen/ApproveOrRejectZone";
import ReviewersList from "@features/zoneManager/EditZoneStatusScreen/ReviewersList";
import SelfAssignReview from "@features/zoneManager/EditZoneStatusScreen/SelfAssignReview";
import UnpublishedZone from "@features/zoneManager/EditZoneStatusScreen/UnpublishedZone";
import {
  ZoneManagerRoutes,
  ZoneManagerScreenProps,
} from "@features/zoneManager/Navigation/types";
import useGlobalPermissions from "@hooks/useGlobalPermissions";
import usePermissions from "@hooks/usePermissions";
import useRefresh from "@hooks/useRefresh";
import { inferProcedureOutput } from "@trpc/server";
import { GlobalPermissions } from "@utils/auth0/types";
import zoneStatus from "@utils/zoneStatus";
import { FC, useMemo, useState } from "react";
import { z } from "zod";

type Props = ZoneManagerScreenProps<ZoneManagerRoutes.EditZoneStatus>;

type Item = inferProcedureOutput<AppRouter["zones"]["statusById"]>;

const EditZoneStatus: FC<Props> = ({
  route: {
    params: { zoneId, zoneName },
  },
}) => {
  const { data, isLoading, isFetching, refetch } =
    trpc.zones.statusById.useQuery(
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

  const latestStatus = useMemo(
    () =>
      data?.statusHistory.reduce((prev, current) => {
        if (!prev) return current;
        return prev?.createdAt?.getTime() > current.createdAt.getTime()
          ? prev
          : current;
      }, undefined as Item["statusHistory"][0] | undefined),
    [data?.statusHistory],
  );

  const requestRevision = trpc.zoneReview.requestRevision.useMutation({
    onSuccess: () => {
      utils.zones.statusById.invalidate({ zoneId });
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

  const refresh = useRefresh(refetch, isFetching && !isLoading);

  if (isLoading)
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
      <KeyboardAvoidingBox>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={refresh}
        >
          <KeyboardDismiss>
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
                  backgroundColor={
                    zoneStatus(data.currentStatus).backgroundColor
                  }
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
                {latestStatus?.message?.originalText && (
                  <Box>
                    <Text variant="h4" marginBottom="s">
                      Mensaje:
                    </Text>

                    <Text variant="p2R">
                      {latestStatus?.message?.originalText}
                    </Text>
                  </Box>
                )}
                <ActionByStatus
                  status={data.currentStatus}
                  message={message}
                  setMessage={setMessage}
                  visible={
                    !!permission?.has("RequestZoneReview") &&
                    (data.currentStatus === StatusSchema.Enum.Unpublished ||
                      data.currentStatus === StatusSchema.Enum.Rejected)
                  }
                  isLoading={requestRevision.isLoading}
                  disabled={requestRevision.isLoading}
                  onPress={() => {
                    const isValid = z
                      .string()
                      .max(280)
                      .safeParse(message).success;
                    if (!isValid) return;
                    requestRevision.mutate({ zoneId, message });
                  }}
                />
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
                    const isValid = z
                      .string()
                      .max(280)
                      .safeParse(message).success;
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
                    const isValid = z
                      .string()
                      .max(280)
                      .safeParse(message).success;
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
                    const isValid = z
                      .string()
                      .max(280)
                      .safeParse(message).success;
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
                <ReviewersList reviewers={reviewers} />
                <SelfAssignReview status={data?.currentStatus} />
                <ApproveOrRejectZone status={data?.currentStatus} />
                <UnpublishedZone status={data?.currentStatus} />
              </Box>
            )}
          </KeyboardDismiss>
        </ScrollView>
      </KeyboardAvoidingBox>
    </Screen>
  );
};

export default EditZoneStatus;
