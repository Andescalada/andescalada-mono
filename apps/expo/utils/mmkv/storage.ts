import { MMKV } from "react-native-mmkv";

const storage = new MMKV();

export enum Store {
  PERMISSIONS = "permissions",
  ACCESS_TOKEN = "TOKEN",
  REFRESH_TOKEN = "REFRESH_TOKEN",
  DECODED_ID_TOKEN = "DECODED_ID_TOKEN",
}

export default storage;
