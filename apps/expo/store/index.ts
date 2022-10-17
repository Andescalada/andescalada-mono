import { configureStore } from "@reduxjs/toolkit";
import authSlice from "@store/auth";
import offlineSlice from "@store/offline";
import { combineReducers } from "redux";

const stores = {
  [authSlice.name]: authSlice.reducer,
  [offlineSlice.name]: offlineSlice.reducer,
};

export const rootReducer = combineReducers(stores);
export const Store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
