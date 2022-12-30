import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import storage, { Storage } from "@utils/mmkv/storage";

interface LocalConfigState {
  routeStrokeWidth: number;
  showRoutes: boolean;
  newNotification: boolean;
}

const initialState: LocalConfigState = {
  routeStrokeWidth: storage.getString(Storage.ROUTE_STROKE_WIDTH)
    ? Number(storage.getString(Storage.ROUTE_STROKE_WIDTH))
    : 1,
  showRoutes: true,
  newNotification: storage.getString(Storage.NEW_NOTIFICATION)
    ? Boolean(storage.getString(Storage.NEW_NOTIFICATION))
    : false,
};

const localConfigSlice = createSlice({
  name: "localConfig",
  initialState,
  reducers: {
    setRouteStrokeWidth: (state, action: PayloadAction<number>) => {
      storage.set(Storage.ROUTE_STROKE_WIDTH, action.payload);
      state.routeStrokeWidth = action.payload;
    },
    setShowRoutes: (state) => {
      state.showRoutes = !state.showRoutes;
    },
    setIsNewNotification: (state, action: PayloadAction<boolean>) => {
      storage.set(Storage.NEW_NOTIFICATION, action.payload);
      state.newNotification = action.payload;
    },
  },
});

export const { setRouteStrokeWidth, setShowRoutes, setIsNewNotification } =
  localConfigSlice.actions;

export default localConfigSlice;
