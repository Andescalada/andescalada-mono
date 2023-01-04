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
  return { fontsLoaded, isAuth, accessToken };
};

export default useHideSplashScreen;
