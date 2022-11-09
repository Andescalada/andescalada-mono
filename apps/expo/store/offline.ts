import { createSlice } from "@reduxjs/toolkit";
import storage from "@utils/mmkv/storage";

interface OfflineState {
  isOffline: boolean;
}

const initialState: OfflineState = {
  isOffline: storage.getString("offline") === "true",
};

const offlineSlice = createSlice({
  name: "offline",
  initialState,
  reducers: {
    setIsOffline: (state) => {
      const currentOffline = storage.getString("offline");
      if (currentOffline === undefined) {
        storage.set("offline", "true");
        state.isOffline = true;
      } else {
        const toBoolean = currentOffline === "true";
        state.isOffline = !toBoolean;
        storage.set("offline", String(!toBoolean));
      }
    },
    activateOffline: (state) => {
      storage.set("offline", "true");
      state.isOffline = true;
    },
  },
});

export const { setIsOffline, activateOffline } = offlineSlice.actions;

export default offlineSlice;
