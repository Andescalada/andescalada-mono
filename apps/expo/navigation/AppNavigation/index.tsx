import { Box, Button, Icon, Screen, Text } from "@andescalada/ui";
import AuthNavigation from "@features/auth/Navigation";
import FallbackErrorScreen from "@features/error/FallbackErrorScreen";
import RootNavigation from "@navigation/AppNavigation/RootNavigation";
import useAutoLogin from "@navigation/AppNavigation/useAutoLogin";
import useHideSplashScreen from "@navigation/AppNavigation/useHideSplashScreen";
import TRPCProvider from "@utils/trpc/Provider";
import * as SplashScreen from "expo-splash-screen";
import * as Updates from "expo-updates";
import { useState } from "react";
import ErrorBoundary from "react-native-error-boundary";
import * as Sentry from "sentry-expo";

SplashScreen.preventAutoHideAsync();

const Navigator = () => {
  const { accessToken, isAuth, fontsLoaded } = useHideSplashScreen();
  useAutoLogin();

  const [newUpdateAvailable, setNewUpdateAvailable] = useState(false);

  const eventListener = (event: Updates.UpdateEvent) => {
    if (event.type === Updates.UpdateEventType.ERROR) {
      Sentry.Native.captureEvent(new Error(event.message));
    } else if (event.type === Updates.UpdateEventType.NO_UPDATE_AVAILABLE) {
      setNewUpdateAvailable(false);
    } else if (event.type === Updates.UpdateEventType.UPDATE_AVAILABLE) {
      setNewUpdateAvailable(true);
    }
  };

  const captureException = (error: Error) =>
    Sentry.Native.captureException(error);

  Updates.useUpdateEvents(eventListener);

  if (!fontsLoaded) {
    return <Screen backgroundColor="transitionScreen" />;
  }

  if (newUpdateAvailable) {
    return (
      <Screen
        backgroundColor="transitionScreen"
        padding="m"
        justifyContent="center"
        alignItems="center"
      >
        <Text variant="h2" marginHorizontal="l" textAlign="center">
          Hay una nueva versión disponible
        </Text>
        <Box marginVertical="l">
          <Icon name="dancing-dinosaur-color" size={100} />
        </Box>
        <Button
          variant="info"
          title="Actualizar"
          onPress={Updates.reloadAsync}
        />
      </Screen>
    );
  }

  return (
    <ErrorBoundary
      onError={captureException}
      FallbackComponent={FallbackErrorScreen}
    >
      {isAuth && accessToken ? (
        <TRPCProvider accessToken={accessToken}>
          <RootNavigation />
        </TRPCProvider>
      ) : (
        <AuthNavigation />
      )}
    </ErrorBoundary>
  );
};

export default Navigator;
