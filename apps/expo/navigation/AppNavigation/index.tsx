import { useEffect, useCallback } from 'react';
import RootNavigation from '@navigation/AppNavigation/RootNavigation';
import AuthNavigation from '@navigation/AppNavigation/AuthNavigation';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Screen } from '@andescalada/ui';
import { autoLoginAuth0 } from '@store/auth';
import fonts from '@assets/fonts';

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
  }, [fontsLoaded]);

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
