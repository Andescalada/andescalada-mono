import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { onlineManager } from "@tanstack/react-query";
import storage from "@utils/mmkv/storage";

type Error = { [key: string]: string };

interface OfflineState {
  isOffline: boolean;
  progress: number;
  isDownloading: boolean;
  errors: Error[];
}

const initialState: OfflineState = {
  isOffline: storage.getString("offline") === "true",
  progress: 0,
  isDownloading: false,
  errors: [],
};

const offlineSlice = createSlice({
  name: "offline",
  initialState,
  reducers: {
    setIsOffline: (state) => {
      const currentOffline = storage.getString("offline");
      if (currentOffline === undefined) {
        storage.set("offline", "true");
        onlineManager.setOnline(false);
        state.isOffline = true;
      } else {
        const toBoolean = currentOffline === "true";
        state.isOffline = !toBoolean;
        onlineManager.setOnline(undefined);
        storage.set("offline", String(!toBoolean));
      }
    },
    activateOffline: (state) => {
      storage.set("offline", "true");
      state.isOffline = true;
    },
    setProgress: (state, action: PayloadAction<number>) => {
      state.progress = action.payload;
    },
    setIsDownloading: (state, action: PayloadAction<boolean>) => {
      state.isDownloading = action.payload;
    },
    setError: (state, action: PayloadAction<Error>) => {
      state.errors = [...state.errors, action.payload];
    },
    clearErrors: (state) => {
      state.errors = [];
    },
  },
});

export const {
  setIsOffline,
  activateOffline,
  setIsDownloading,
  setProgress,
  setError,
  clearErrors,
} = offlineSlice.actions;

export default offlineSlice;
