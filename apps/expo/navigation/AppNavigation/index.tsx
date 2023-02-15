import AuthNavigation from "@features/auth/Navigation";
import RootNavigation from "@navigation/AppNavigation/RootNavigation";
import useAutoLogin from "@navigation/AppNavigation/useAutoLogin";
import useHideSplashScreen from "@navigation/AppNavigation/useHideSplashScreen";
import TRPCProvider from "@utils/trpc/Provider";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

const Navigator = () => {
  const { accessToken, isAuth } = useHideSplashScreen();
  useAutoLogin();

  return (
    <>
      {isAuth && accessToken ? (
        <TRPCProvider accessToken={accessToken}>
          <RootNavigation />
        </TRPCProvider>
      ) : (
        <AuthNavigation />
      )}
    </>
  );
};

export default Navigator;
