import { pallete } from "@andescalada/ui/Theme/pallete";
import {
  createNotifications,
  ZoomInDownZoomOutUp,
} from "react-native-notificated";

export const { NotificationsProvider, useNotifications, notify } =
  createNotifications({
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
  });
