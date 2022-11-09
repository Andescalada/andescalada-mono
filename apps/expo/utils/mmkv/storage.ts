import { MMKV } from "react-native-mmkv";

console.log(process.env.APP_VARIANT);
const storage = new MMKV({ id: `expo-${process.env.APP_VARIANT}` });

export enum Storage {
  PERMISSIONS = "permissions",
  ACCESS_TOKEN = "TOKEN",
  REFRESH_TOKEN = "REFRESH_TOKEN",
  DECODED_ID_TOKEN = "DECODED_ID_TOKEN",
  DOWNLOADED_ASSETS = "DOWNLOADED_ASSETS",
  DOWNLOADED_IMAGES = "DOWNLOADED_IMAGES",
}

export default storage;
