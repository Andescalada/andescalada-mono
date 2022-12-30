import { UserNavigationRoutes } from "@features/user/Navigation/types";
import { useAppDispatch } from "@hooks/redux";
import useRootNavigation from "@hooks/useRootNavigation";
import { RootNavigationRoutes } from "@navigation/AppNavigation/RootNavigation/types";
import { setIsNewNotification } from "@store/localConfigs";
import { useNotifications } from "@utils/notificated";
import {
  addNotificationReceivedListener,
  removeNotificationSubscription,
  useLastNotificationResponse,
} from "expo-notifications";
import { useEffect, useRef } from "react";

export const DEFAULT_ACTION_IDENTIFIER =
  "expo.modules.notifications.actions.DEFAULT";

export type Subscription = {
  remove: () => void;
};

const usePushNotification = () => {
  const notificationListener = useRef<Subscription>();
  const { notify } = useNotifications();

  const lastNotificationResponse = useLastNotificationResponse();
  const rootNavigation = useRootNavigation();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (lastNotificationResponse) {
      console.log(
        lastNotificationResponse.notification.request.content.title,
        "lastNotification",
      );
    }
  }, [lastNotificationResponse]);

  useEffect(() => {
    notificationListener.current = addNotificationReceivedListener(
      (response) => {
        dispatch(setIsNewNotification(true));
        notify("info", {
          params: {
            title: response.request.content.body || "Notification nueva",
            hideCloseButton: true,
            onPress: () =>
              rootNavigation.navigate(RootNavigationRoutes.User, {
                screen: UserNavigationRoutes.Notifications,
              }),
          },
        });
      },
    );

    return () => {
      if (notificationListener.current) {
        removeNotificationSubscription(notificationListener.current);
      }
    };
  }, [dispatch, notify, rootNavigation]);
};

export default usePushNotification;
