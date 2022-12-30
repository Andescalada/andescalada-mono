import {
  ActivityIndicator,
  Box,
  Button,
  Ionicons,
  Pressable,
  Screen,
  ScrollView,
  Text,
  TextFieldAccordion,
} from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
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
  const { data, isLoading, isFetching } = trpc.zones.statusById.useQuery({
    zoneId,
  });

  const globalPermissions = useGlobalPermissions();

  const reviewers = useMemo(
    () => data?.RoleByZone.map((r) => r.User),
    [data?.RoleByZone],
  );

  const utils = trpc.useContext();

  const editStatus = trpc.zones.requestRevision.useMutation({
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

  const { permission } = usePermissions({ zoneId });

  console.log(permission);

  const [showMore, setShowMore] = useState(false);
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

            {zoneStatus(data.currentStatus).nextStepTitle && (
              <>
                <TextFieldAccordion
                  label="Agregar mensaje"
                  value={message}
                  onChangeText={setMessage}
                  marginVertical="s"
                />
                <Button
                  marginTop="m"
                  isLoading={editStatus.isLoading}
                  disabled={editStatus.isLoading}
                  title={zoneStatus(data.currentStatus).nextStepTitle || ""}
                  variant="info"
                  onPress={() => {
                    const isValid = z
                      .string()
                      .max(280)
                      .safeParse(message).success;
                    if (!isValid) return;
                    editStatus.mutate({ zoneId, message });
                  }}
                />
              </>
            )}
            <Pressable
              marginTop="s"
              flexDirection="row"
              alignItems="center"
              onPress={() => setShowMore((prev) => !prev)}
              justifyContent="center"
            >
              <Ionicons name="information-circle-sharp" size={20} />
              <Text variant="h4" marginLeft="s" textDecorationLine="underline">
                Sobre el siguiente paso
              </Text>
            </Pressable>
            {showMore && (
              <Text variant="p2R" textAlign="center">
                {zoneStatus(data.currentStatus).about}
              </Text>
            )}
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
            <Box>
              {(permission?.has("ApproveZone") ||
                permission?.has("RejectZone")) && (
                <TextFieldAccordion
                  label="Agregar mensaje"
                  value={message}
                  onChangeText={setMessage}
                  marginBottom="m"
                />
              )}
              <Box
                flexDirection="row"
                alignItems="center"
                justifyContent="space-evenly"
              >
                {permission?.has("ApproveZone") && (
                  <Button variant="success" title="Aprobar" />
                )}
                {permission?.has("RejectZone") && (
                  <Button variant="error" title="Rechazar" />
                )}
              </Box>
            </Box>
          </Box>
        )}
      </ScrollView>
    </Screen>
  );
};

export default EditZoneStatus;
