import { RoleNamesSchema } from "@andescalada/db/zod";
import { ActivityIndicator, Box, Button, Text } from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import UserItem from "@features/InfoAccessManager/MembersScreen/UserItem";
import usePermissions from "@hooks/usePermissions";
import useRefresh from "@hooks/useRefresh";
import type { Zone } from "@prisma/client";
import { FC, useMemo } from "react";
import { Alert, FlatList } from "react-native";

interface Props {
  zoneId: Zone["id"];
}

const MembersList: FC<Props> = ({ zoneId }) => {
  const { data, isLoading, refetch, isRefetching } =
    trpc.zones.usersByRole.useQuery({
      roles: ["Member", "Reader"],
      zoneId,
    });

  const refresh = useRefresh(refetch, isRefetching);
  const usersList = useMemo(() => {
    const members =
      data?.find((d) => d.role === RoleNamesSchema.Enum.Member)?.users || [];
    const readers =
      data?.find((d) => d.role === RoleNamesSchema.Enum.Reader)?.users || [];
    return [...members, ...readers];
  }, [data]);

  const utils = trpc.useContext();
  const pauseAccess = trpc.zoneAccess.pauseUserAccess.useMutation({
    onMutate: async ({ userId }) => {
      await utils.zones.usersByRole.cancel({
        roles: ["Member", "Reader"],
        zoneId,
      });
      const previousData = utils.zones.usersByRole.getData({
        roles: ["Member", "Reader"],
        zoneId,
      });
      utils.zones.usersByRole.setData(
        {
          roles: ["Member", "Reader"],
          zoneId,
        },
        (old) =>
          old
            ? old.map((list) => ({
                role: list.role,
                users: list.users.filter((u) => u.id !== userId),
              }))
            : old,
      );
      return { previousData };
    },
    onError: (_, __, context) => {
      if (context?.previousData) {
        utils.zones.usersByRole.setData(
          {
            roles: ["Member", "Reader"],
            zoneId,
          },
          context.previousData,
        );
      }
    },
    onSuccess: () => {
      utils.zones.usersByRole.invalidate({
        roles: ["Member", "Reader"],
        zoneId,
      });
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
      <FlatList
        data={usersList}
        keyExtractor={(item) => item.id}
        refreshControl={refresh}
        ListEmptyComponent={() => (
          <Box alignItems="center" marginTop="xxxl">
            <Text variant="p3R">No se encontraron miembros</Text>
          </Box>
        )}
        renderItem={({ item }) => (
          <UserItem item={item}>
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
