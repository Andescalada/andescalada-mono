import "expo-dev-client";

import { Box, Button, Icon, Screen, Text } from "@andescalada/ui";
import { darkTheme } from "@andescalada/ui/Theme/navigationTheme";
import ThemeProvider from "@andescalada/ui/Theme/ThemeProvider";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import AppNavigation from "@navigation/AppNavigation";
import NavigationMemoized from "@navigation/NavigationMemoized";
import { Store } from "@store/index";
import Env from "@utils/env";
import storage from "@utils/mmkv/storage";
import { NotificationsProvider } from "@utils/notificated";
import { StatusBar } from "expo-status-bar";
import { connectToDevTools } from "react-devtools-core";
import { LogBox } from "react-native";
import ErrorBoundary from "react-native-error-boundary";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { initializeMMKVFlipper } from "react-native-mmkv-flipper-plugin";
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
  dsn: Env.SENTRY_DNS,
  debug: __DEV__,
  enableInExpoDevelopment: false,
  environment: Env.SENTRY_DEPLOY_ENV,
});

LogBox.ignoreLogs([
  "Sending `onAnimatedValueUpdate` with no listeners registered.",
  "The native module for Flipper seems unavailable. Please verify that `react-native-flipper` is installed as yarn dependency to your project and, for iOS, that `pod install` is run in the `ios` directory.",
  // Coming from React Query Devtools
  "JSON.stringify cannot serialize BigInt",
]);

export default function App() {
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <ErrorBoundary
          onError={(error) => Sentry.Native.captureException(error)}
          FallbackComponent={FallbackErrorScreen}
        >
          <NotificationsProvider>
            <StoreProvider store={Store}>
              <ActionSheetProvider>
                <GestureHandlerRootView style={{ flex: 1 }}>
                  <NavigationMemoized theme={darkTheme}>
                    <StatusBar style="light" />
                    <AppNavigation />
                  </NavigationMemoized>
                </GestureHandlerRootView>
              </ActionSheetProvider>
            </StoreProvider>
          </NotificationsProvider>
        </ErrorBoundary>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

const FallbackErrorScreen = ({
  error,
  resetError,
}: {
  error: Error;
  resetError: () => void;
}) => {
  return (
    <Screen padding="m" backgroundColor="brand.primaryA">
      <Text variant="h1" color="brand.secondaryA">
        ¡Tuvimos un error!
      </Text>
      <Box flex={1} marginTop="xl">
        <Text variant="h4" marginTop="m" color="grayscale.white">
          Se nos cayó el ATC en la mitad de un multi-largo.
        </Text>
        <Box marginVertical="m" alignSelf="center">
          <Icon name="climber-rappeling" size={100} />
        </Box>
        <Text variant="p1R" marginTop="m" color="grayscale.white">
          Reinicia la app, si el error persiste bórrala y vuelve a descargarla.
        </Text>
      </Box>
      <Box>
        <Text variant="p1R" color="grayscale.white">
          {error.message}
        </Text>
      </Box>
      <Button
        title="Volver a intentar"
        variant="transparent"
        onPress={resetError}
      />
    </Screen>
  );
};
