import { RoleNamesSchema } from "@andescalada/db/zod";
import {
  ActivityIndicator,
  AddButton,
  Box,
  Ionicons,
  Modal,
  Pressable,
  Text,
} from "@andescalada/ui";
import roleNameAssets from "@andescalada/utils/roleNameAssets";
import { trpc } from "@andescalada/utils/trpc";
import UserItem from "@features/InfoAccessManager/MembersScreen/UserItem";
import {
  InfoAccessManagerNavigationProps,
  InfoAccessManagerRoutes,
} from "@features/InfoAccessManager/Navigation/types";
import usePermissions from "@hooks/usePermissions";
import useRefresh from "@hooks/useRefresh";
import { Zone } from "@prisma/client";
import { useNavigation } from "@react-navigation/native";
import { FC, useState } from "react";
import { FlatList } from "react-native";

interface Props {
  zoneId: Zone["id"];
  zoneName: Zone["name"];
}

const AdminsList: FC<Props> = ({ zoneId, zoneName }) => {
  const { data, isLoading, refetch, isFetching } =
    trpc.zones.usersByRole.useQuery({
      roles: ["Admin", "Editor", "Collaborator"],
      zoneId,
    });

  const refresh = useRefresh(refetch, isFetching && !isLoading);

  const navigation =
    useNavigation<
      InfoAccessManagerNavigationProps<InfoAccessManagerRoutes.MembersScreen>
    >();

  const { permission } = usePermissions({ zoneId });

  const [selectedRole, setSelectedRole] =
    useState<typeof RoleNamesSchema._type>();

  if (isLoading)
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <ActivityIndicator size="large" />
      </Box>
    );
  return (
    <Box flex={1}>
      {permission?.has("AssignZoneRole") && (
        <Pressable
          flexDirection="row"
          justifyContent="space-between"
          margin="m"
          onPress={() =>
            navigation.navigate(
              InfoAccessManagerRoutes.AddZoneRoleToUserScreen,
              { zoneId, zoneName },
            )
          }
        >
          <Text variant="h4">Agregar roles</Text>
          <AddButton
            onPress={() =>
              navigation.navigate(
                InfoAccessManagerRoutes.AddZoneRoleToUserScreen,
                { zoneId, zoneName },
              )
            }
          />
        </Pressable>
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
            <Box flexDirection={"row"} alignItems="flex-end">
              <Text variant="p1R" marginTop="s" marginLeft="m" lineHeight={0}>
                {roleNameAssets[role].plural}
              </Text>
              <Pressable marginLeft="xs" onPress={() => setSelectedRole(role)}>
                <Ionicons name="information-circle" size={20} />
              </Pressable>
            </Box>
            <FlatList
              data={users}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <UserItem item={item} />}
            />
          </Box>
        )}
      />
      <Modal
        visible={!!selectedRole}
        onDismiss={() => setSelectedRole(undefined)}
        padding="m"
        margin="m"
      >
        <Modal.Close />
        {selectedRole && (
          <>
            <Box marginRight="xxl">
              <Text variant="h4">{`Sobre ${roleNameAssets[selectedRole].plural}`}</Text>
            </Box>
            <Box>
              <Text variant="p2R" lineHeight={32}>
                {roleNameAssets[selectedRole].description}
              </Text>
            </Box>
          </>
        )}
      </Modal>
    </Box>
  );
};

export default AdminsList;
