import { ActivityIndicator, AddButton, Box, Text } from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import UserItem from "@features/InfoAccessManager/MembersScreen/UserItem";
import usePermissions from "@hooks/usePermissions";
import useRefresh from "@hooks/useRefresh";
import { Zone } from "@prisma/client";
import roleNameAssets from "@utils/roleNameAssets";
import { FC } from "react";
import { FlatList } from "react-native";

interface Props {
  zoneId: Zone["id"];
}

const AdminsList: FC<Props> = ({ zoneId }) => {
  const { data, isLoading, refetch, isFetching } =
    trpc.zones.usersByRole.useQuery({
      roles: ["Admin", "Editor", "Collaborator"],
      zoneId,
    });

  const refresh = useRefresh(refetch, isFetching && !isLoading);

  const { permission } = usePermissions({ zoneId });

  if (isLoading)
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <ActivityIndicator size="large" />
      </Box>
    );
  return (
    <Box flex={1}>
      {permission?.has("AssignZoneRole") && (
        <Box flexDirection="row" justifyContent="space-between" margin="m">
          <Text variant="h4">Agregar colaborador</Text>
          <AddButton />
        </Box>
      )}
      <FlatList
        data={data}
        keyExtractor={(item) => item.role}
        nestedScrollEnabled
        refreshControl={refresh}
        ListEmptyComponent={() => (
          <Box alignItems="center" marginTop="xxxl">
            <Text variant="p3R">No se encontraron miembros</Text>
          </Box>
        )}
        renderItem={({ item: { role, users } }) => (
          <Box>
            <Text variant="p1R" marginTop="s" marginLeft="m">
              {roleNameAssets[role].plural}
            </Text>
            <FlatList
              data={users}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <UserItem item={item} />}
            />
          </Box>
        )}
      />
    </Box>
  );
};

export default AdminsList;
