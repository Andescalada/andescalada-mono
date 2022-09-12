import { Storage } from '@assets/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { login, logout } from '@utils/auth0';

export interface AuthState {
  isAuth: boolean;
  loadingAuth: boolean;
}

const initialState: AuthState = {
  loadingAuth: false,
  isAuth: false,
};

export const loginAuth0 = createAsyncThunk(
  'auth/loginAuth0',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoadingAuth(true));
      const { accessToken, decodedIdToken, refreshToken } = await login();
      await AsyncStorage.setItem(Storage.ACCESS_TOKEN, accessToken);
      await AsyncStorage.setItem(Storage.REFRESH_TOKEN, refreshToken);
      await AsyncStorage.setItem(
        Storage.DECODED_ID_TOKEN,
        String(decodedIdToken),
      );
      dispatch(setLoadingAuth(false));
      return { isAuth: true };
    } catch (err) {
      rejectWithValue(err);
      return { isAuth: false };
    }
  },
);

export const logoutAuth0 = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await logout();
      await AsyncStorage.removeItem(Storage.ACCESS_TOKEN);
      await AsyncStorage.removeItem(Storage.REFRESH_TOKEN);
      await AsyncStorage.removeItem(Storage.DECODED_ID_TOKEN);
      return { isAuth: false };
    } catch (error) {
      rejectWithValue(error);
      return { isAuth: true };
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoadingAuth: (state, action: PayloadAction<boolean>) => {
      state.loadingAuth = action.payload;
    },
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginAuth0.fulfilled, (state, action) => {
      state.isAuth = action.payload.isAuth;
    });
    builder.addCase(logoutAuth0.fulfilled, (state, action) => {
      state.isAuth = action.payload.isAuth;
    });
  },
});

export const { setLoadingAuth, setIsAuth } = authSlice.actions;

export default authSlice;
