import "expo-dev-client";

import { darkTheme } from "@andescalada/ui/Theme/navigationTheme";
import ThemeProvider from "@andescalada/ui/Theme/ThemeProvider";
import { SENTRY_DNS } from "@env";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import AppNavigation from "@navigation/AppNavigation";
import NavigationMemoized from "@navigation/NavigationMemoized";
import { Store } from "@store/index";
import storage from "@utils/mmkv/storage";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { connectToDevTools } from "react-devtools-core";
import { initializeMMKVFlipper } from "react-native-mmkv-flipper-plugin";
import { NetworkProvider } from "react-native-offline";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as StoreProvider } from "react-redux";
import * as Sentry from "sentry-expo";

if (__DEV__) {
  connectToDevTools({
    host: "localhost",
    port: 8097,
  });
  initializeMMKVFlipper({ default: storage });
}

Sentry.init({
  dsn: SENTRY_DNS,
  enableNative: !__DEV__,
  debug: __DEV__,
});

export default function App() {
  return (
    <NetworkProvider>
      <ThemeProvider>
        <SafeAreaProvider>
          <StoreProvider store={Store}>
            <ActionSheetProvider>
              <NavigationMemoized theme={darkTheme}>
                <StatusBar style="light" />
                <AppNavigation />
              </NavigationMemoized>
            </ActionSheetProvider>
          </StoreProvider>
        </SafeAreaProvider>
      </ThemeProvider>
    </NetworkProvider>
  );
}
