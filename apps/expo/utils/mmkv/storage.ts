import { atomWithStorage, createJSONStorage } from "jotai/utils";
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
  NEW_NOTIFICATION = "NEW_NOTIFICATION",
  SKIP_AGREEMENTS_INTRO = "DO_NOT_SHOW_AGREEMENT_INTRO",
  RECENT_ZONES = "RECENT_ZONES",
  IS_OFFLINE_MODE = "IS_OFFLINE_MODE",
  DOWNLOADED_ZONES = "DOWNLOADED_ZONES",
}
function getItem<T>(key: string) {
  const value = storage.getString(key);
  return value ? (JSON.parse(value) as T) : null;
}

function setItem<T>(key: string, value: T): void {
  storage.set(key, JSON.stringify(value));
}

function removeItem(key: string): void {
  storage.delete(key);
}

function clearAll(): void {
  storage.clearAll();
}

export const atomWithMMKV = <T>(key: string, initialValue: T) =>
  atomWithStorage<T>(
    key,
    initialValue,
    createJSONStorage<T>(() => ({
      getItem,
      setItem,
      removeItem,
      clearAll,
    })),
  );

export default storage;
