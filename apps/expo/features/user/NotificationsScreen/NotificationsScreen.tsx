import {
  ActivityIndicator,
  Box,
  Button,
  Pressable,
  Screen,
  Text,
} from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import UserProfileImage from "@features/user/components/UserProfileImage/UserProfileImage";
import {
  UserNavigationRoutes,
  UserNavigationScreenProps,
} from "@features/user/Navigation/types";
import useNotificationPress from "@features/user/NotificationsScreen/useNotificationPress";
import { useAppDispatch } from "@hooks/redux";
import useRefresh from "@hooks/useRefresh";
import { useFocusEffect } from "@react-navigation/native";
import { setIsNewNotification } from "@store/localConfigs";
import { FC, useCallback, useState } from "react";
import { FlatList, StyleSheet } from "react-native";

type Props = UserNavigationScreenProps<UserNavigationRoutes.Notifications>;

const NotificationsScreen: FC<Props> = () => {
  const [viewAll, setViewAll] = useState(false);

  const utils = trpc.useContext();
  const {
    data = [],
    isLoading,
    refetch,
    isFetching,
  } = trpc.user.notifications.useQuery({
    filterReadNotifications: !viewAll,
  });

  const clearAll = trpc.user.setManyNotificationsToRead.useMutation({
    onMutate: () => {
      utils.user.notifications.setData(undefined, []);
    },
    onSuccess: () => {
      utils.user.notifications.invalidate();
    },
  });

  const refresh = useRefresh(refetch, isFetching && !isLoading);

  const onPressHandler = useNotificationPress();

  const dispatch = useAppDispatch();

  useFocusEffect(
    useCallback(() => {
      dispatch(setIsNewNotification(false));
    }, [dispatch]),
  );

  return (
    <Screen safeAreaDisabled padding="m">
      <Box alignItems="stretch" flexDirection="row" justifyContent="flex-end">
        <Button
          variant={viewAll ? "infoSmall" : "infoSmallOutline"}
          title="Ver todas"
          paddingVertical="xs"
          paddingHorizontal="s"
          alignSelf="stretch"
          titleVariant={"p2R"}
          onPress={() => setViewAll((prev) => !prev)}
        />
        <Button
          variant={clearAll.isLoading ? "infoSmall" : "infoSmallOutline"}
          title="Borrar todas"
          paddingVertical="xs"
          marginLeft="xs"
          paddingHorizontal="s"
          alignSelf="stretch"
          titleVariant={"p2R"}
          onPress={() => clearAll.mutate()}
        />
      </Box>
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Box
            flex={1}
            justifyContent="center"
            alignItems="center"
            marginTop="xxxl"
          >
            {isLoading ? (
              <ActivityIndicator size="large" />
            ) : (
              <Text variant="p2R">No tienes notificaciones nuevas 🎉</Text>
            )}
          </Box>
        )}
        refreshControl={refresh}
        renderItem={({ item }) => (
          <Pressable
            paddingVertical="s"
            flexDirection="row"
            alignItems="center"
            onPress={() => {
              onPressHandler(item);
            }}
          >
            <UserProfileImage
              publicId={
                item.Object.NotificationSender[0].Sender.profilePhoto
                  ?.publicId || undefined
              }
              style={styles.image}
              marginRight="s"
            />
            <Box flex={1}>
              <Text variant="p2R" numberOfLines={3} ellipsizeMode="tail">
                {item.Object.messageSent}
              </Text>
            </Box>
          </Pressable>
        )}
      />
    </Screen>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  image: {
    width: 100 / 2.5,
    height: 100 / 2.5,
    borderRadius: 100,
  },
});
