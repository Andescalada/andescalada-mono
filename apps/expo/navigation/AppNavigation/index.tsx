import { Screen } from "@andescalada/ui";
import fonts from "@assets/fonts";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import AuthNavigation from "@navigation/AppNavigation/AuthNavigation";
import RootNavigation from "@navigation/AppNavigation/RootNavigation";
import { autoLoginAuth0 } from "@store/auth";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect } from "react";

SplashScreen.preventAutoHideAsync();

const Navigator = () => {
  const { isAuth, accessToken, autoLoginCompleted } = useAppSelector(
    (state) => state.auth,
  );
  const dispatch = useAppDispatch();
  const [fontsLoaded] = useFonts(fonts);
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded && autoLoginCompleted) {
      await SplashScreen.hideAsync();
    }
  }, [autoLoginCompleted, fontsLoaded]);

  useEffect(() => {
    onLayoutRootView();
  }, [onLayoutRootView]);

  useEffect(() => {
    dispatch(autoLoginAuth0());
  }, [dispatch]);

  if (!fontsLoaded) {
    return <Screen backgroundColor="transitionScreen" />;
  }
  return (
    <>
      {isAuth && accessToken ? (
        <RootNavigation accessToken={accessToken} />
      ) : (
        <AuthNavigation />
      )}
    </>
  );
};

export default Navigator;
