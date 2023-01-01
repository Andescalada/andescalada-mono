import { AppRouter } from "@andescalada/api/src/routers/_app";
import { EntityTypeIdSchema } from "@andescalada/db/zod";
import {
  ActivityIndicator,
  Box,
  Button,
  Pressable,
  Screen,
  Text,
} from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import { ClimbsNavigationRoutes } from "@features/climbs/Navigation/types";
import UserProfileImage from "@features/user/components/UserProfileImage/UserProfileImage";
import {
  UserNavigationRoutes,
  UserNavigationScreenProps,
} from "@features/user/Navigation/types";
import { useAppDispatch } from "@hooks/redux";
import useRefresh from "@hooks/useRefresh";
import useRootNavigation from "@hooks/useRootNavigation";
import { RootNavigationRoutes } from "@navigation/AppNavigation/RootNavigation/types";
import { useFocusEffect } from "@react-navigation/native";
import { setIsNewNotification } from "@store/localConfigs";
import { inferProcedureOutput } from "@trpc/server";
import { FC, useCallback, useState } from "react";
import { FlatList, StyleSheet } from "react-native";

type Props = UserNavigationScreenProps<UserNavigationRoutes.Notifications>;

type NotificationType = inferProcedureOutput<
  AppRouter["user"]["notifications"]
>[0];

const NotificationsScreen: FC<Props> = () => {
  const [viewAll, setViewAll] = useState(false);

  const {
    data = [],
    isLoading,
    refetch,
    isFetching,
  } = trpc.user.notifications.useQuery({
    filterReadNotifications: !viewAll,
  });

  const refresh = useRefresh(refetch, isFetching && !isLoading);

  const onPressHandler = useOnPressHandler();

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

const useOnPressHandler = () => {
  const rootNavigation = useRootNavigation();
  const utils = trpc.useContext();
  const setNotificationToRead = trpc.user.setNotificationToRead.useMutation({
    onSuccess: () => {
      utils.user.notifications.invalidate();
    },
  });
  const onPressHandler = useCallback(async (item: NotificationType) => {
    if (!item.isRead) setNotificationToRead.mutate(item.id);

    switch (item.Object.entityTypeId) {
      case EntityTypeIdSchema.Enum.RequestZoneReview: {
        if ("zone" in item && item.zone?.id && item.zone?.name) {
          rootNavigation.navigate(RootNavigationRoutes.Climbs, {
            screen: ClimbsNavigationRoutes.Zone,
            params: { zoneId: item.zone?.id, zoneName: item.zone?.name },
          });
        }
        break;
      }
      default:
        throw new Error("Not implemented");
    }
  }, []);
  return onPressHandler;
};
