import { configureStore } from "@reduxjs/toolkit";
import authSlice from "@store/auth";
import localConfigSlice from "@store/localConfigs";
import { combineReducers } from "redux";

const stores = {
  [authSlice.name]: authSlice.reducer,
  [localConfigSlice.name]: localConfigSlice.reducer,
};

export const rootReducer = combineReducers(stores);
export const Store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
