import "expo-dev-client";

import { darkTheme } from "@andescalada/ui/Theme/navigationTheme";
import ThemeProvider from "@andescalada/ui/Theme/ThemeProvider";
import { SENTRY_DNS } from "@env";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import AppNavigation from "@navigation/AppNavigation";
import NavigationMemoized from "@navigation/NavigationMemoized";
import { Store } from "@store/index";
import { StatusBar } from "expo-status-bar";
import { connectToDevTools } from "react-devtools-core";
import { NetworkProvider } from "react-native-offline";
import { Provider as StoreProvider } from "react-redux";
import * as Sentry from "sentry-expo";

if (__DEV__) {
  connectToDevTools({
    host: "localhost",
    port: 8097,
  });
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
        <StoreProvider store={Store}>
          <NavigationMemoized theme={darkTheme}>
            <ActionSheetProvider>
              <>
                <StatusBar style="light" />
                <AppNavigation />
              </>
            </ActionSheetProvider>
          </NavigationMemoized>
        </StoreProvider>
      </ThemeProvider>
    </NetworkProvider>
  );
}
