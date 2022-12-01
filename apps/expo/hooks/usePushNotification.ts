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

  const lastNotificationResponse = useLastNotificationResponse();

  useEffect(() => {
    if (
      lastNotificationResponse &&
      lastNotificationResponse.notification.request.content &&
      lastNotificationResponse.actionIdentifier === DEFAULT_ACTION_IDENTIFIER
    ) {
      console.log(lastNotificationResponse.notification.request.content);
    }
  }, [lastNotificationResponse]);

  useEffect(() => {
    notificationListener.current = addNotificationReceivedListener(
      (response) => {
        console.log(response);
      },
    );

    return () => {
      if (notificationListener.current) {
        removeNotificationSubscription(notificationListener.current);
      }
    };
  }, []);
};

export default usePushNotification;
