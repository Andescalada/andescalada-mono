import type { Zone } from "@andescalada/db";
import { RoleNamesSchema } from "@andescalada/db/zod";
import { ActivityIndicator, Box, Button, Text } from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import MemberModal from "@features/InfoAccessManager/MembersScreen/MemberModal";
import UserItem from "@features/InfoAccessManager/MembersScreen/UserItem";
import usePauseAccess from "@hooks/usePauseAccess";
import usePermissions from "@hooks/usePermissions";
import useRefresh from "@hooks/useRefresh";
import { FC, useMemo, useState } from "react";
import { Alert, FlatList } from "react-native";

interface Props {
  zoneId: Zone["id"];
}

const RolesEnum = RoleNamesSchema.Enum;

const MembersList: FC<Props> = ({ zoneId }) => {
  const { data, isLoading, refetch, isRefetching } =
    trpc.zones.membersList.useQuery({
      roles: [
        RolesEnum.Member,
        RolesEnum.Reader,
        RolesEnum.Admin,
        RolesEnum.Collaborator,
        RolesEnum.Editor,
      ],
      zoneId,
    });

  const refresh = useRefresh(refetch, isRefetching);

  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const selectedUser = useMemo(
    () => data?.find((u) => u.id === selectedUserId) || null,
    [selectedUserId, data],
  );

  const pauseAccess = usePauseAccess({
    invalidation: {
      roles: ["Member", "Reader"],
      zoneId,
    },
  });

  const { permission } = usePermissions({ zoneId });

  if (isLoading)
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <ActivityIndicator size="large" />
      </Box>
    );
  return (
    <Box flex={1}>
      <MemberModal
        visible={!!selectedUser}
        selectedUser={selectedUser}
        onDismiss={() => setSelectedUserId(null)}
        navigateToUser={(userId) => setSelectedUserId(userId)}
      />

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        refreshControl={refresh}
        ListEmptyComponent={() => (
          <Box alignItems="center" marginTop="xxxl">
            <Text variant="p3R">No se encontraron miembros</Text>
          </Box>
        )}
        renderItem={({ item }) => (
          <UserItem
            item={item}
            onPress={() => {
              setSelectedUserId(item.id);
            }}
          >
            {permission?.has("PauseZoneAccess") && (
              <Button
                title="Eliminar"
                variant="transparentSimplified"
                titleVariant="p3B"
                marginRight="s"
                onPress={() =>
                  Alert.alert("Eliminar miembro", "¿Estás seguro?", [
                    { text: "Cancelar", style: "cancel" },
                    {
                      text: "Eliminar",
                      style: "destructive",
                      onPress: () =>
                        pauseAccess.mutate({ userId: item.id, zoneId }),
                    },
                  ])
                }
                paddingHorizontal="xs"
              />
            )}
          </UserItem>
        )}
      />
    </Box>
  );
};

export default MembersList;
