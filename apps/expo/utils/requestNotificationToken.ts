import client from "@utils/trpc/client";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

const UNKNOWN_DEVICE_NAME = "unknown";

export const requestNotificationToken = async () => {
  let token: string | undefined = undefined;

  const { isDevice, deviceName } = Device;

  if (isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      throw new Error("Unable to get push token for push notification!");
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    console.error("Physical device is required for push notifications!");
    return;
  }

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
    });
  }

  return { token, deviceName: deviceName || UNKNOWN_DEVICE_NAME };
};

export const registerNotificationTokenInServer = async () => {
  const notificationToken = await requestNotificationToken();

  if (notificationToken) {
    const { deviceName, token } = notificationToken;
    client.notifications.registerUserToken.mutate({
      token,
      deviceName,
    });
  }
};

export const unregisterNotificationTokenInServer = async () => {
  client.notifications.unregisterUserToken.mutate({
    deviceName: Device.deviceName || UNKNOWN_DEVICE_NAME,
  });
};
