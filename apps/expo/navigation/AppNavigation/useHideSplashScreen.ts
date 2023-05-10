import fonts from "@assets/fonts";
import { useAppSelector } from "@hooks/redux";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect } from "react";

const useHideSplashScreen = () => {
  const { autoLoginCompleted, isAuth, accessToken } = useAppSelector(
    (state) => state.auth,
  );

  const { navigationReady } = useAppSelector((state) => state.localConfig);

  const [fontsLoaded] = useFonts(fonts);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded && autoLoginCompleted && navigationReady) {
      await SplashScreen.hideAsync();
    }
  }, [autoLoginCompleted, fontsLoaded, navigationReady]);

  useEffect(() => {
    onLayoutRootView();
  }, [onLayoutRootView]);

  if (process.env.OFFLINE_DEV === "true") {
    return {
      isAuth: true,
      accessToken: "fake token 2",
      fontsLoaded,
    };
  }

  return { fontsLoaded, isAuth, accessToken };
};

export default useHideSplashScreen;
