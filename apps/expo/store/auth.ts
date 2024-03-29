import { database } from "@local-database/index";
import NetInfo from "@react-native-community/netinfo";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { auth0Tokens, login, logout } from "@utils/auth0";
import {
  DecodedAccessToken,
  DecodedIdToken,
  GlobalPermissions,
} from "@utils/auth0/types";
import { isTokenExpired, tokenDecode } from "@utils/decode";
import storage, { Storage } from "@utils/mmkv/storage";
import offlineDb from "@utils/quick-sqlite";
import {
  registerNotificationTokenInServer,
  unregisterNotificationTokenInServer,
} from "@utils/requestNotificationToken";
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
  async (
    {
      accessToken,
      idToken,
      refreshToken,
    }: { accessToken: string; idToken: string; refreshToken: string },
    { dispatch, rejectWithValue },
  ) => {
    try {
      dispatch(setLoadingAuth(true));
      const decodedIdToken = tokenDecode(idToken);

      const decodedAccessToken = tokenDecode<DecodedAccessToken>(accessToken);
      storage.set(Storage.ACCESS_TOKEN, accessToken);
      storage.set(Storage.REFRESH_TOKEN, refreshToken);
      storage.set(Storage.DECODED_ID_TOKEN, stringify(decodedIdToken));
      dispatch(setLoadingAuth(false));

      registerNotificationTokenInServer();

      return {
        isAuth: true,
        accessToken,
        email: (decodedIdToken as DecodedIdToken)?.name,
        globalPermissions: decodedAccessToken.permissions,
        autoLoginCompleted: true,
      };
    } catch (err) {
      rejectWithValue(err);
      dispatch(setAutoLoginCompleted(true));
      return { isAuth: false, autoLoginCompleted: true };
    }
  },
);

export const autoLoginAuth0 = createAsyncThunk(
  "auth/autoLoginAuth0",
  async (_, { rejectWithValue }) => {
    try {
      const { isConnected } = await NetInfo.fetch();
      const token = storage.getString(Storage.ACCESS_TOKEN);
      const decodedIdToken = parse<DecodedIdToken>(
        storage.getString(Storage.DECODED_ID_TOKEN) || "{}",
      );

      if (!token) {
        throw new Error("No encontramos una sesión activa");
      }

      const decodedToken = tokenDecode<DecodedAccessToken | undefined>(token);

      const hasExpired = isTokenExpired(decodedToken?.exp);
      if (!hasExpired || !isConnected) {
        return {
          isAuth: true,
          accessToken: token,
          email: decodedIdToken.name,
          globalPermissions: decodedToken?.permissions,
        };
      }

      const res = await auth0Tokens.refreshTokens();

      if (res?.accessToken) {
        return {
          isAuth: true,
          accessToken: res.accessToken,
          email: decodedIdToken.name,
          globalPermissions: decodedToken?.permissions,
        };
      } else {
        throw new Error(
          "Duración máxima de las sesión alcanzada, debes volver a iniciar sesión",
        );
      }
    } catch (err) {
      const { isConnected } = await NetInfo.fetch();
      const token = storage.getString(Storage.ACCESS_TOKEN);
      if (!isConnected && token) {
        const decodedToken = tokenDecode<DecodedAccessToken>(token);
        const decodedIdToken = parse<DecodedIdToken>(
          storage.getString(Storage.DECODED_ID_TOKEN) || "{}",
        );
        return {
          isAuth: true,
          accessToken: token,
          email: decodedIdToken.name,
          globalPermissions: decodedToken.permissions,
        };
      }
      rejectWithValue(err);
      await clearAllLocalData();
      return { isAuth: false };
    }
  },
);

export const loginWithPassword = createAsyncThunk(
  "auth/loginWithPassword",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const { accessToken, idToken, refreshToken } = await login();

      dispatch(loginAuth0({ accessToken, idToken, refreshToken }));
    } catch (err) {
      rejectWithValue(err);
    }
  },
);

export const logoutAuth0 = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await unregisterNotificationTokenInServer();
      await logout();
      clearAllLocalData();
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
      state.autoLoginCompleted = !!action.payload.autoLoginCompleted;
    });
    builder.addCase(logoutAuth0.fulfilled, (state, action) => {
      state.isAuth = action.payload.isAuth;
    });
    builder.addCase(autoLoginAuth0.fulfilled, (state, action) => {
      state.isAuth = action.payload.isAuth;
      state.accessToken = action.payload?.accessToken;
      state.email = action.payload.email;
      state.globalPermissions = action.payload.globalPermissions || [];
      state.autoLoginCompleted = true;
    });
  },
});

export const { setLoadingAuth, setIsAuth, setAutoLoginCompleted } =
  authSlice.actions;

export default authSlice;

const clearAllLocalData = async () => {
  storage.clearAll();
  const db = offlineDb.open();
  db.delete();
  await database.write(async () => {
    await database.unsafeResetDatabase();
  });
};
