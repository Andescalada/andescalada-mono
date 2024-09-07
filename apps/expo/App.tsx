import "expo-dev-client";

import { Text, ThemeProvider } from "@andescalada/ui";
import { darkTheme } from "@andescalada/ui/Theme/navigationTheme";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import AppNavigation from "@navigation/AppNavigation";
import NavigationMemoized from "@navigation/NavigationMemoized";
import * as Sentry from "@sentry/react-native";
import { Store } from "@store/index";
import Env from "@utils/env";
import { NotificationsProvider } from "@utils/notificated";
import { StatusBar } from "expo-status-bar";
import { LogBox, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as StoreProvider } from "react-redux";

if (!__DEV__) {
  Sentry.init({
    dsn: Env.SENTRY_DNS,
    debug: __DEV__,
    environment: Env.SENTRY_DEPLOY_ENV,
  });
}

LogBox.ignoreLogs([
  "Sending `onAnimatedValueUpdate` with no listeners registered.",
  "The native module for Flipper seems unavailable. Please verify that `react-native-flipper` is installed as yarn dependency to your project and, for iOS, that `pod install` is run in the `ios` directory.",
]);

function App() {
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <NotificationsProvider>
          {/* <StoreProvider store={Store}>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <ActionSheetProvider>
                <NavigationMemoized theme={darkTheme}>
                  <StatusBar style="light" /> */}
          {/* <AppNavigation /> */}
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "red",
            }}
          >
            <Text>Hello</Text>
          </View>
          {/* </NavigationMemoized>
              </ActionSheetProvider>
            </GestureHandlerRootView>
          </StoreProvider> */}
        </NotificationsProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

export default App;

// export default Sentry.wrap(App);
