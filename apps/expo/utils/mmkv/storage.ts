import { MMKV } from "react-native-mmkv";

const storage = new MMKV({ id: `expo-${process.env.APP_VARIANT}` });

export enum Storage {
  PERMISSIONS = "permissions",
  ACCESS_TOKEN = "TOKEN",
  REFRESH_TOKEN = "REFRESH_TOKEN",
  DECODED_ID_TOKEN = "DECODED_ID_TOKEN",
  DOWNLOADED_ASSETS = "DOWNLOADED_ASSETS",
  DOWNLOADED_IMAGES = "DOWNLOADED_IMAGES",
  ROUTE_STROKE_WIDTH = "ROUTE_STROKE_WIDTH",
}

export default storage;
