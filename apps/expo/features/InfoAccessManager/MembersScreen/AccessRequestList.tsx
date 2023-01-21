import {
  ActivityIndicator,
  AddButton,
  Box,
  Button,
  Pressable,
  Text,
} from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import UserItem from "@features/InfoAccessManager/MembersScreen/UserItem";
import usePermissions from "@hooks/usePermissions";
import useRefresh from "@hooks/useRefresh";
import { Zone } from "@prisma/client";
import { FC } from "react";
import { FlatList } from "react-native";

interface Props {
  zoneId: Zone["id"];
}

const AccessRequestList: FC<Props> = ({ zoneId }) => {
  const utils = trpc.useContext();

  const { data, isLoading, refetch, isFetching } =
    trpc.zoneAccess.usersRequestingAccessToZone.useQuery({ zoneId });

  const acceptAccess = trpc.zoneAccess.approveZoneAccess.useMutation({
    onMutate: async ({ userId }) => {
      await utils.zoneAccess.usersRequestingAccessToZone.cancel();
      const previousData = utils.zoneAccess.usersRequestingAccessToZone.getData(
        { zoneId },
      );
      utils.zoneAccess.usersRequestingAccessToZone.setData(
        { zoneId },
        (old) => {
          if (!old) return old;
          const newData = old.filter((item) => item.User.id !== userId);
          return newData;
        },
      );
      return { previousData };
    },
    onError: (_, __, context) => {
      utils.zoneAccess.usersRequestingAccessToZone.setData(
        { zoneId },
        context?.previousData,
      );
    },
    onSuccess: () => {
      utils.zoneAccess.usersRequestingAccessToZone.invalidate({ zoneId });
      utils.zones.usersByRole.invalidate({ roles: ["Member"], zoneId });
    },
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
      {permission?.has("GrantAccess") && (
        <Pressable
          flexDirection="row"
          justifyContent="space-between"
          margin="m"
        >
          <Text variant="h4">Invitar</Text>
          <AddButton />
        </Pressable>
      )}
      <FlatList
        data={data}
        keyExtractor={(item) => item.User.id}
        refreshControl={refresh}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Box justifyContent="center" alignItems="center" marginTop="xxxl">
            <Text variant="p3R">No hay solicitudes</Text>
          </Box>
        )}
        renderItem={({ item }) => (
          <UserItem item={item.User}>
            <Button
              title="Agregar"
              variant="primary"
              titleVariant="p3B"
              marginRight="s"
              onPress={() =>
                acceptAccess.mutate({ userId: item.User.id, zoneId })
              }
            />
          </UserItem>
        )}
      />
    </Box>
  );
};

export default AccessRequestList;
