import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import storage, { Storage } from "@utils/mmkv/storage";

interface LocalConfigState {
  newNotification: boolean;
  navigationReady: boolean;
}

const initialState: LocalConfigState = {
  newNotification: storage.getString(Storage.NEW_NOTIFICATION)
    ? Boolean(storage.getString(Storage.NEW_NOTIFICATION))
    : false,
  navigationReady: !__DEV__,
};

const localConfigSlice = createSlice({
  name: "localConfig",
  initialState,
  reducers: {
    setIsNewNotification: (state, action: PayloadAction<boolean>) => {
      storage.set(Storage.NEW_NOTIFICATION, action.payload);
      state.newNotification = action.payload;
    },
    setIsNavigationReady: (state, action: PayloadAction<boolean>) => {
      state.navigationReady = action.payload;
    },
  },
});

export const { setIsNewNotification, setIsNavigationReady } =
  localConfigSlice.actions;

export default localConfigSlice;
