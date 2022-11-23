import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import storage, { Storage } from "@utils/mmkv/storage";

interface LocalConfigState {
  routeStrokeWidth: number;
  showRoutes: boolean;
}

const initialState: LocalConfigState = {
  routeStrokeWidth: storage.getString(Storage.ROUTE_STROKE_WIDTH)
    ? Number(storage.getString(Storage.ROUTE_STROKE_WIDTH))
    : 1,
  showRoutes: true,
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
  },
});

export const { setRouteStrokeWidth, setShowRoutes } = localConfigSlice.actions;

export default localConfigSlice;
