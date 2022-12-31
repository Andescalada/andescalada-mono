import { StatusSchema } from "@andescalada/db/zod";
import {
  ActivityIndicator,
  Box,
  Button,
  Screen,
  ScrollView,
  Text,
  TextFieldAccordion,
} from "@andescalada/ui";
import { TextFieldAccordionRef } from "@andescalada/ui/TextFieldAccordion/TextFieldAccordion";
import { trpc } from "@andescalada/utils/trpc";
import ActionByStatus from "@features/zoneManager/EditZoneStatusScreen/ActionByStatus";
import {
  ZoneManagerRoutes,
  ZoneManagerScreenProps,
} from "@features/zoneManager/Navigation/types";
import useGlobalPermissions from "@hooks/useGlobalPermissions";
import usePermissions from "@hooks/usePermissions";
import { GlobalPermissions } from "@utils/auth0/types";
import { useNotifications } from "@utils/notificated";
import zoneStatus from "@utils/zoneStatus";
import { FC, useMemo, useRef, useState } from "react";
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
  const textFieldAccordionRef = useRef<TextFieldAccordionRef>(null);
  const { notify } = useNotifications();

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
            {!permission?.has("ApproveZone") && (
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
            {data?.currentStatus === StatusSchema.Enum.InReview && (
              <Box>
                {(permission?.has("ApproveZone") ||
                  permission?.has("RejectZone")) && (
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
              </Box>
            )}
          </Box>
        )}
      </ScrollView>
    </Screen>
  );
};

export default EditZoneStatus;
