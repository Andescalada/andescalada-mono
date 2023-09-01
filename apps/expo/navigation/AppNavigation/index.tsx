import { Box, Button, Icon, Screen, Text } from "@andescalada/ui";
import AuthNavigation from "@features/auth/Navigation";
import FallbackErrorScreen from "@features/error/FallbackErrorScreen";
import useUpdateChecker from "@hooks/useUpdateChecker";
import RootNavigation from "@navigation/AppNavigation/RootNavigation";
import useAutoLogin from "@navigation/AppNavigation/useAutoLogin";
import useHideSplashScreen from "@navigation/AppNavigation/useHideSplashScreen";
import goToAppStore from "@utils/goToAppStore";
import TRPCProvider from "@utils/trpc/TRPCProvider";
import * as SplashScreen from "expo-splash-screen";
import * as Updates from "expo-updates";
import ErrorBoundary from "react-native-error-boundary";
import * as Sentry from "sentry-expo";

SplashScreen.preventAutoHideAsync();

const Navigator = () => {
  const { accessToken, isAuth, fontsLoaded } = useHideSplashScreen();
  useAutoLogin();

  const { newBuildUpdate, newSoftUpdate } = useUpdateChecker();
  const captureException = (error: Error) =>
    Sentry.Native.captureException(error);

  if (!fontsLoaded) {
    return <Screen backgroundColor="transitionScreen" />;
  }

  if (newBuildUpdate) {
    return (
      <Screen
        backgroundColor="transitionScreen"
        padding="m"
        justifyContent="center"
        alignItems="center"
      >
        <Text variant="h2" marginHorizontal="l" textAlign="center">
          Hay una nueva versión disponible en la tienda de aplicaciones
        </Text>
        <Box marginVertical="xl">
          <Icon name="cool-dinosaur-color" size={100} />
        </Box>
        <Button variant="info" title="Ir a la tienda" onPress={goToAppStore} />
      </Screen>
    );
  }

  if (newSoftUpdate) {
    Updates.reloadAsync();
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
          padding="m"
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
