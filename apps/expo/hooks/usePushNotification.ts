import { trpc } from "@andescalada/utils/trpc";
import { UserNavigationRoutes } from "@features/user/Navigation/types";
import { useAppDispatch } from "@hooks/redux";
import useRootNavigation from "@hooks/useRootNavigation";
import { RootNavigationRoutes } from "@navigation/AppNavigation/RootNavigation/types";
import { Store } from "@store/index";
import { setIsNewNotification } from "@store/localConfigs";
import { useNotifications } from "@utils/notificated";
import {
  addNotificationReceivedListener,
  removeNotificationSubscription,
  useLastNotificationResponse,
} from "expo-notifications";
import * as Notifications from "expo-notifications";
import * as TaskManager from "expo-task-manager";
import { useEffect, useRef } from "react";

export const DEFAULT_ACTION_IDENTIFIER =
  "expo.modules.notifications.actions.DEFAULT";

export type Subscription = {
  remove: () => void;
};

const BACKGROUND_NOTIFICATION_TASK = "background-notification-task";

const { dispatch } = Store;

TaskManager.defineTask(BACKGROUND_NOTIFICATION_TASK, () => {
  dispatch(setIsNewNotification(true));
});

Notifications.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK);

const usePushNotification = () => {
  const notificationListener = useRef<Subscription>();
  const { notify } = useNotifications();

  const lastNotificationResponse = useLastNotificationResponse();
  const rootNavigation = useRootNavigation();

  const dispatch = useAppDispatch();

  const utils = trpc.useContext();

  useEffect(() => {
    if (lastNotificationResponse) {
      console.info(
        lastNotificationResponse.notification.request.content.title,
        "lastNotification",
      );
      rootNavigation.navigate(RootNavigationRoutes.User, {
        screen: UserNavigationRoutes.Notifications,
      });
    }
  }, [lastNotificationResponse, rootNavigation]);

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
        utils.user.notifications.prefetch();
      }
    };
  }, [dispatch, notify, rootNavigation, utils.user.notifications]);
};

export default usePushNotification;
