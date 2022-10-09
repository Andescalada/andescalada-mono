import "expo-dev-client";

import { darkTheme } from "@andescalada/ui/Theme/navigationTheme";
import ThemeProvider from "@andescalada/ui/Theme/ThemeProvider";
import { SENTRY_DNS } from "@env";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import AppNavigation from "@navigation/AppNavigation";
import NavigationMemoized from "@navigation/NavigationMemoized";
import { Store } from "@store/index";
import { StatusBar } from "expo-status-bar";
import { Provider as StoreProvider } from "react-redux";
import * as Sentry from "sentry-expo";

Sentry.init({
  dsn: SENTRY_DNS,
  enableInExpoDevelopment: true,
  enableNative: false,
  debug: true, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
});

export default function App() {
  return (
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
  );
}
