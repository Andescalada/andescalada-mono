import { slug, unSlug } from "@andescalada/api/src/utils/slug";
import { ClimbsNavigationRoutes } from "@features/climbs/Navigation/types";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { RootNavigationRoutes } from "@navigation/AppNavigation/RootNavigation/types";
import {
  InitialState,
  LinkingOptions,
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import { setIsNavigationReady } from "@store/localConfigs";
import storage from "@utils/mmkv/storage";
import Constants from "expo-constants";
import * as Linking from "expo-linking";
import {
  ComponentProps,
  FC,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { configLoggerType, consoleTransport, logger } from "react-native-logs";

const defaultConfig: configLoggerType = {
  levels: {
    info: 1,
  },
  severity: "debug",
  transport: consoleTransport,
  transportOptions: {
    colors: {
      info: "magenta",
    },
    extensionColors: {
      nav: "white",
    },
  },
  async: true,
  dateFormat: "time",
  printLevel: true,
  printDate: true,
  enabled: true,
  enabledExtensions: ["nav"],
};

const l = logger.createLogger(defaultConfig);
const log = l.extend("nav");

const NAVIGATION_STATE_KEY = `NAVIGATION_STATE_KEY-${
  Constants.expoConfig && Constants.expoConfig.sdkVersion
}`;
interface Props extends ComponentProps<typeof NavigationContainer> {
  children: React.ReactNode;
}

const config = {
  screens: {
    [RootNavigationRoutes.Climbs]: {
      screens: {
        [ClimbsNavigationRoutes.Zone]: {
          path: "zona/:zoneId/:zoneName",
          parse: {
            zoneName: (slug: string) => unSlug(slug),
          },
          stringify: {
            zoneName: (zoneName: string) => slug(zoneName),
          },
        },
        [ClimbsNavigationRoutes.Home]: {
          path: "open-app",
        },
      },
    },
  },
};

const linking: LinkingOptions<ReactNavigation.RootParamList> = {
  config,
  prefixes: [
    Linking.createURL("/"),
    "https://andescalada.org",
    "https://*.andescalada.org",
  ],
};

const NavigationMemoized: FC<Props> = ({ children, ...props }) => {
  const dispatch = useAppDispatch();
  const { navigationReady } = useAppSelector((state) => state.localConfig);
  const [initialState, setInitialState] = useState<InitialState | undefined>();

  useEffect(() => {
    if (process.env.AVOID_MEMOIZED_NAVIGATION === "true") {
      dispatch(setIsNavigationReady(true));
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
        dispatch(setIsNavigationReady(true));
      }
    };

    if (!navigationReady) {
      restoreState();
    }
  }, [dispatch, navigationReady]);

  const navigationRef = useNavigationContainerRef();
  const routeNameRef = useRef<string | null>(null);

  const onStateChange = useCallback(
    async (state: InitialState | undefined) => {
      const previousRouteName = routeNameRef.current;
      const currentRouteName = navigationRef?.getCurrentRoute()?.name ?? null;
      if (previousRouteName !== currentRouteName) {
        routeNameRef.current = currentRouteName;
        log.info(currentRouteName);
      }
      if (state) {
        storage.set(NAVIGATION_STATE_KEY, JSON.stringify(state));
      }
    },
    [navigationRef],
  );

  if (!navigationReady) {
    return null;
  }
  return (
    <NavigationContainer
      linking={linking}
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef?.getCurrentRoute()?.name ?? null;
      }}
      {...{ onStateChange, initialState, ...props }}
    >
      {children}
    </NavigationContainer>
  );
};

export default NavigationMemoized;
