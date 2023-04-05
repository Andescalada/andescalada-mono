import roleNameAssets from "@andescalada/common-assets/roleNameAssets";
import { RoleNamesSchema } from "@andescalada/db/zod";
import {
  ActivityIndicator,
  AddButton,
  Box,
  Button,
  Ionicons,
  Modal,
  Pressable,
  Text,
} from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import UserItem from "@features/InfoAccessManager/MembersScreen/UserItem";
import {
  InfoAccessManagerNavigationProps,
  InfoAccessManagerRoutes,
} from "@features/InfoAccessManager/Navigation/types";
import useOwnInfo from "@hooks/useOwnInfo";
import usePermissions from "@hooks/usePermissions";
import useRefresh from "@hooks/useRefresh";
import useRemoveZoneRole from "@hooks/useRemoveZoneRole";
import { Zone } from "@prisma/client";
import { useNavigation } from "@react-navigation/native";
import { FC, useState } from "react";
import { Alert, FlatList } from "react-native";

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

  const removeRole = useRemoveZoneRole({
    invalidation: {
      roles: ["Admin", "Editor", "Collaborator"],
      zoneId,
    },
  });

  const navigation =
    useNavigation<
      InfoAccessManagerNavigationProps<InfoAccessManagerRoutes.MembersScreen>
    >();

  const { permission } = usePermissions({ zoneId });

  const { data: ownInfoData } = useOwnInfo();

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
            <Box flexDirection={"row"} alignItems="center">
              <Text variant="p1R" marginLeft="m" lineHeight={undefined}>
                {roleNameAssets[role].plural}
              </Text>
              <Pressable marginLeft="xs" onPress={() => setSelectedRole(role)}>
                <Ionicons name="information-circle" size={20} />
              </Pressable>
            </Box>
            <FlatList
              data={users}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <UserItem item={item}>
                  {permission?.has("RevokeZoneRole") &&
                    ownInfoData?.id !== item.id && (
                      <Button
                        title="Eliminar"
                        variant="transparentSimplified"
                        titleVariant="p3B"
                        marginRight="s"
                        onPress={() =>
                          Alert.alert(
                            `Eliminar usuario de ${roleNameAssets[role].plural}`,
                            "¿Estás seguro?",
                            [
                              { text: "Cancelar", style: "cancel" },
                              {
                                text: "Eliminar",
                                style: "destructive",
                                onPress: () =>
                                  removeRole.mutate({
                                    userId: item.id,
                                    zoneId,
                                    role,
                                  }),
                              },
                            ],
                          )
                        }
                        paddingHorizontal="xs"
                      />
                    )}
                </UserItem>
              )}
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
