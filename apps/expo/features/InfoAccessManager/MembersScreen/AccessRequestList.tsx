import { RequestStatusSchema, StatusSchema } from "@andescalada/db/zod";
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
import {
  InfoAccessManagerNavigationProps,
  InfoAccessManagerRoutes,
} from "@features/InfoAccessManager/Navigation/types";
import useZonesAllSectors from "@hooks/offlineQueries/useZonesAllSectors";
import usePermissions from "@hooks/usePermissions";
import useRefresh from "@hooks/useRefresh";
import { Zone } from "@prisma/client";
import { useNavigation } from "@react-navigation/native";
import { FC, useCallback } from "react";
import { Alert, FlatList } from "react-native";

interface Props {
  zoneId: Zone["id"];
  zoneName: Zone["name"];
}

const AccessRequestList: FC<Props> = ({ zoneId, zoneName }) => {
  const navigation =
    useNavigation<
      InfoAccessManagerNavigationProps<InfoAccessManagerRoutes.MembersScreen>
    >();

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
          const updateUser = old.find((item) => item.User.id === userId);
          if (!updateUser) return old;
          updateUser.status = RequestStatusSchema.enum.Accepted;
          const newData = old.filter((item) => item.User.id !== userId);
          return [...newData, updateUser];
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
      utils.zones.usersByRole.invalidate({
        roles: ["Member", "Reader"],
        zoneId,
      });
    },
  });

  const zone = useZonesAllSectors({ zoneId });

  const refresh = useRefresh(refetch, isFetching && !isLoading);
  const { permission } = usePermissions({ zoneId });

  const onInvite = useCallback(() => {
    if (zone.data?.currentStatus !== StatusSchema.enum.Published) {
      Alert.alert("Solo puedes invitar usuarios cuando la zona esté publicada");
      return;
    }
    navigation.navigate(InfoAccessManagerRoutes.InviteUserToZoneScreen, {
      zoneId,
      zoneName,
    });
  }, [navigation, zone.data?.currentStatus, zoneId, zoneName]);

  if (isLoading || zone.isLoading)
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
          onPress={onInvite}
        >
          <Text variant="h4">Invitar</Text>
          <AddButton onPress={onInvite} />
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
              title={
                item.status === RequestStatusSchema.enum.Accepted
                  ? "Agregado"
                  : "Agregar"
              }
              variant={
                item.status === RequestStatusSchema.enum.Accepted
                  ? "transparentSimplified"
                  : "primary"
              }
              titleVariant="p3B"
              padding="xs"
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
