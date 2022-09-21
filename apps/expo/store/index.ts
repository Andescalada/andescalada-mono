import { configureStore } from "@reduxjs/toolkit";
import authSlice from "@store/auth";
import { combineReducers } from "redux";

const stores = {
  [authSlice.name]: authSlice.reducer,
};

export const rootReducer = combineReducers(stores);
export const Store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
