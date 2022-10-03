import { Storage } from "@assets/Constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { auth0Tokens, login, logout } from "@utils/auth0";
import { DecodedIdToken } from "@utils/auth0/types";
import { isExpired } from "@utils/decode";
import jwtDecode from "jwt-decode";

export interface AuthState {
  isAuth: boolean;
  loadingAuth: boolean;
  accessToken: undefined | string;
  autoLoginCompleted: boolean;
  email: string | undefined;
}

export interface AccessToken {
  exp: number;
}

const initialState: AuthState = {
  loadingAuth: false,
  isAuth: false,
  accessToken: undefined,
  autoLoginCompleted: false,
  email: undefined,
};

export const loginAuth0 = createAsyncThunk(
  "auth/loginAuth0",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoadingAuth(true));
      const { accessToken, decodedIdToken, refreshToken } = await login();

      await AsyncStorage.setItem(Storage.ACCESS_TOKEN, accessToken);
      await AsyncStorage.setItem(Storage.REFRESH_TOKEN, refreshToken);
      await AsyncStorage.setItem(
        Storage.DECODED_ID_TOKEN,
        JSON.stringify(decodedIdToken),
      );
      dispatch(setLoadingAuth(false));
      dispatch(setAutoLoginCompleted(true));
      return {
        isAuth: true,
        accessToken,
        email: (decodedIdToken as DecodedIdToken)?.name,
      };
    } catch (err) {
      rejectWithValue(err);
      dispatch(setAutoLoginCompleted(true));
      return { isAuth: false };
    }
  },
);

export const autoLoginAuth0 = createAsyncThunk(
  "auth/autoLoginAuth0",
  async (_, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem(Storage.ACCESS_TOKEN);
      const decodedIdToken = await AsyncStorage.getItem(
        Storage.DECODED_ID_TOKEN,
      ).then((d) => (d ? JSON.parse(d) : {}) as DecodedIdToken);

      if (!token) return { isAuth: false };
      const decodedToken: AccessToken = jwtDecode(token);
      const hasExpired = isExpired(decodedToken.exp);
      if (!hasExpired)
        return { isAuth: true, accessToken: token, email: decodedIdToken.name };
      const res = await auth0Tokens.refreshTokens();
      if (res?.accessToken) {
        return {
          isAuth: true,
          accessToken: res.accessToken,
          email: decodedIdToken.name,
        };
      }
    } catch (err) {
      rejectWithValue(err);
    }
    return { isAuth: false };
  },
);

export const logoutAuth0 = createAsyncThunk(
  "auth/logout",
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
  name: "auth",
  initialState,
  reducers: {
    setLoadingAuth: (state, action: PayloadAction<boolean>) => {
      state.loadingAuth = action.payload;
    },
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    setAutoLoginCompleted: (state, action: PayloadAction<boolean>) => {
      state.autoLoginCompleted = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginAuth0.fulfilled, (state, action) => {
      state.isAuth = action.payload.isAuth;
      state.accessToken = action.payload.accessToken;
      state.email = action.payload.email;
    });
    builder.addCase(logoutAuth0.fulfilled, (state, action) => {
      state.isAuth = action.payload.isAuth;
    });
    builder.addCase(autoLoginAuth0.fulfilled, (state, action) => {
      state.isAuth = action.payload.isAuth;
      state.accessToken = action.payload?.accessToken;
      state.email = action.payload.email;
    });
  },
});

export const { setLoadingAuth, setIsAuth, setAutoLoginCompleted } =
  authSlice.actions;

export default authSlice;
