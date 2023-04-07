import { pallete } from "@andescalada/ui/Theme/pallete";
import { FC, ReactNode } from "react";
import {
  createNotifications,
  ZoomInDownZoomOutUp,
} from "react-native-notificated";

const { NotificationsProvider, useNotifications, notify } = createNotifications(
  {
    notificationPosition: "top",
    isNotch: true,
    animationConfig: ZoomInDownZoomOutUp,

    defaultStylesSettings: {
      darkMode: true,
      globalConfig: {
        bgColor: pallete.grayscale.black,
        borderWidth: 3,
        borderRadius: 5,
        defaultIconType: "no-icon",
        multiline: 3,
      },
      successConfig: {
        accentColor: pallete.semantic.success,
      },
      errorConfig: {
        accentColor: pallete.semantic.error,
      },
      warningConfig: {
        accentColor: pallete.semantic.warning,
      },
      infoConfig: {
        accentColor: pallete.semantic.info,
      },
    },
  },
);

const n = NotificationsProvider as FC<{ children: ReactNode }>;

export { n as NotificationsProvider, notify, useNotifications };
