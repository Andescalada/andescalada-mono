import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import authSlice from '@store/auth';

const stores = {
  [authSlice.name]: authSlice.reducer,
};

export const rootReducer = combineReducers(stores);
export const Store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
