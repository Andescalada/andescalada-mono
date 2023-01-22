import { RoleNamesSchema } from "@andescalada/db/zod";
import { ActivityIndicator, Box, Button, Text } from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import UserItem from "@features/InfoAccessManager/MembersScreen/UserItem";
import usePermissions from "@hooks/usePermissions";
import useRefresh from "@hooks/useRefresh";
import type { Zone } from "@prisma/client";
import { FC, useMemo } from "react";
import { FlatList } from "react-native";

interface Props {
  zoneId: Zone["id"];
}

const MembersList: FC<Props> = ({ zoneId }) => {
  const { data, isLoading, refetch, isFetching } =
    trpc.zones.usersByRole.useQuery({
      roles: ["Member", "Reader"],
      zoneId,
    });

  const refresh = useRefresh(refetch, isFetching && !isLoading);
  const usersList = useMemo(() => {
    const members =
      data?.find((d) => d.role === RoleNamesSchema.Enum.Member)?.users || [];
    const readers =
      data?.find((d) => d.role === RoleNamesSchema.Enum.Reader)?.users || [];
    return [...members, ...readers];
  }, [data]);

  const utils = trpc.useContext();
  const pauseAccess = trpc.zoneAccess.pauseUserAccess.useMutation({
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
                title="Pausar acceso"
                variant="transparentSimplified"
                titleVariant="p3B"
                marginRight="s"
                isLoading={pauseAccess.isLoading}
                onPress={() => pauseAccess.mutate({ userId: item.id, zoneId })}
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
