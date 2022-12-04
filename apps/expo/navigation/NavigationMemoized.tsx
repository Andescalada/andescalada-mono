import { InitialState, NavigationContainer } from "@react-navigation/native";
import storage from "@utils/mmkv/storage";
import Constants from "expo-constants";
import * as SplashScreen from "expo-splash-screen";
import React, {
  ComponentProps,
  FC,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

const NAVIGATION_STATE_KEY = `NAVIGATION_STATE_KEY-${
  Constants.manifest && Constants.manifest.sdkVersion
}`;
interface Props extends ComponentProps<typeof NavigationContainer> {
  children: React.ReactNode;
}

const NavigationMemoized: FC<Props> = ({ children, ...props }) => {
  const [isNavigationReady, setIsNavigationReady] = useState(!__DEV__);
  const [initialState, setInitialState] = useState<InitialState | undefined>();

  useEffect(() => {
    if (process.env.AVOID_MEMOIZED_NAVIGATION === "true") {
      setIsNavigationReady(true);
      return;
    }
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
    >
      {children}
    </NavigationContainer>
  );
};

export default NavigationMemoized;
