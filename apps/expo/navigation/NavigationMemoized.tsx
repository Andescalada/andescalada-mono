import { DdRumReactNavigationTracking } from "@datadog/mobile-react-navigation";
import { InitialState, NavigationContainer } from "@react-navigation/native";
import storage from "@utils/mmkv/storage";
import Constants from "expo-constants";
import * as SplashScreen from "expo-splash-screen";
import { useTrackingPermissions } from "expo-tracking-transparency";
import React, {
  ComponentProps,
  FC,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Platform } from "react-native";

const NAVIGATION_STATE_KEY = `NAVIGATION_STATE_KEY-${
  Constants.manifest && Constants.manifest.sdkVersion
}`;
interface Props extends ComponentProps<typeof NavigationContainer> {
  children: React.ReactNode;
}

const NavigationMemoized: FC<Props> = ({ children, ...props }) => {
  const [isNavigationReady, setIsNavigationReady] = useState(!__DEV__);
  const [initialState, setInitialState] = useState<InitialState | undefined>();
  const [status] = useTrackingPermissions();
  useEffect(() => {
    const restoreState = async () => {
      try {
        const savedStateString = storage.getString(NAVIGATION_STATE_KEY);
        const state = savedStateString
          ? JSON.parse(savedStateString)
          : undefined;
        setInitialState(state);
      } finally {
        setIsNavigationReady(true);
      }
    };

    if (!isNavigationReady) {
      restoreState();
    }
  }, [isNavigationReady]);

  const onStateChange = useCallback((state: InitialState | undefined) => {
    if (state) storage.set(NAVIGATION_STATE_KEY, JSON.stringify(state));
  }, []);
  useEffect(() => {
    if (isNavigationReady) {
      SplashScreen.hideAsync();
    }
  }, [isNavigationReady]);

  const navigationRef = useRef(null);

  if (!isNavigationReady) {
    return null;
  }
  return (
    <NavigationContainer
      {...{ onStateChange, initialState, ...props }}
      ref={navigationRef}
      onReady={() => {
        if (Platform.OS === "ios") {
          if (status?.granted)
            DdRumReactNavigationTracking.startTrackingViews(
              navigationRef.current,
            );
        } else {
          DdRumReactNavigationTracking.startTrackingViews(
            navigationRef.current,
          );
        }
      }}
    >
      {children}
    </NavigationContainer>
  );
};

export default NavigationMemoized;
