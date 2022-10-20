import { Storage } from "@assets/Constants";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { auth0Tokens, login, logout } from "@utils/auth0";
import {
  DecodedAccessToken,
  DecodedIdToken,
  GlobalPermissions,
} from "@utils/auth0/types";
import { isExpired, tokenDecode } from "@utils/decode";
import storage from "@utils/mmkv/storage";
import { parse, stringify } from "superjson";

export interface AuthState {
  isAuth: boolean;
  loadingAuth: boolean;
  accessToken: undefined | string;
  autoLoginCompleted: boolean;
  email: string | undefined;
  globalPermissions: GlobalPermissions[];
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
  globalPermissions: [],
};

export const loginAuth0 = createAsyncThunk(
  "auth/loginAuth0",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoadingAuth(true));
      const { accessToken, decodedIdToken, refreshToken } = await login();

      const decodedAccessToken = tokenDecode<DecodedAccessToken>(accessToken);
      storage.set(Storage.ACCESS_TOKEN, accessToken);
      storage.set(Storage.REFRESH_TOKEN, refreshToken);
      storage.set(Storage.DECODED_ID_TOKEN, stringify(decodedIdToken));
      dispatch(setLoadingAuth(false));
      dispatch(setAutoLoginCompleted(true));
      return {
        isAuth: true,
        accessToken,
        email: (decodedIdToken as DecodedIdToken)?.name,
        globalPermissions: decodedAccessToken.permissions,
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
      const token = storage.getString(Storage.ACCESS_TOKEN);
      const decodedIdToken = parse<DecodedIdToken>(
        storage.getString(Storage.DECODED_ID_TOKEN) || "{}",
      );

      if (!token) return { isAuth: false };
      const decodedToken = tokenDecode<DecodedAccessToken>(token);
      const hasExpired = isExpired(decodedToken.exp);

      if (!hasExpired)
        return {
          isAuth: true,
          accessToken: token,
          email: decodedIdToken.name,
          globalPermissions: decodedToken.permissions,
        };

      const res = await auth0Tokens.refreshTokens();

      if (res?.accessToken) {
        return {
          isAuth: true,
          accessToken: res.accessToken,
          email: decodedIdToken.name,
          globalPermissions: decodedToken.permissions,
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
      storage.clearAll();
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
      state.globalPermissions = action.payload.globalPermissions || [];
    });
    builder.addCase(logoutAuth0.fulfilled, (state, action) => {
      state.isAuth = action.payload.isAuth;
    });
    builder.addCase(autoLoginAuth0.fulfilled, (state, action) => {
      state.isAuth = action.payload.isAuth;
      state.accessToken = action.payload?.accessToken;
      state.email = action.payload.email;
      state.globalPermissions = action.payload.globalPermissions || [];
    });
  },
});

export const { setLoadingAuth, setIsAuth, setAutoLoginCompleted } =
  authSlice.actions;

export default authSlice;
