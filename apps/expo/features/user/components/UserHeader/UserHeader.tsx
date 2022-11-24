import { Box, Pressable, Screen } from "@andescalada/ui";
import pathTitle from "@assets/andescaladaPathTitle";
import Ionicons from "@expo/vector-icons/Ionicons";
import UserProfileImage from "@features/user/components/UserProfileImage/UserProfileImage";
import { UserNavigationRoutes } from "@features/user/Navigation/types";
import { useAppDispatch } from "@hooks/redux";
import { useAppTheme } from "@hooks/useAppTheme";
import useOfflineMode from "@hooks/useOfflineMode";
import useOptionsSheet from "@hooks/useOptionsSheet";
import useOwnInfo from "@hooks/useOwnInfo";
import useRootNavigation from "@hooks/useRootNavigation";
import { RootNavigationRoutes } from "@navigation/AppNavigation/RootNavigation/types";
import {
  add,
  Canvas,
  Easing,
  FitBox,
  Group,
  LinearGradient,
  mix,
  Rect,
  rect,
  useComputedValue,
  useLoop,
  vec,
} from "@shopify/react-native-skia";
import { useResponsiveProp } from "@shopify/restyle";
import { logoutAuth0 } from "@store/auth";
import { SCREEN_WIDTH } from "@utils/Dimensions";
import featureFlags from "@utils/featureFlags";
import { useCallback, useMemo } from "react";
import { Alert, StyleSheet } from "react-native";

const HEADER_HEIGHT = 100;
const CANVAS_WIDTH = pathTitle.width;
const CANVAS_HEIGHT = pathTitle.height;

const UserHeader = () => {
  const { data } = useOwnInfo();
  const { profilePhoto } = data || {};

  const theme = useAppTheme();
  const tablet = useResponsiveProp({ mobile: 0, tablet: 1 }) || 0;
  const responsiveScale = useMemo(() => (tablet === 1 ? 2 : 1.4), [tablet]);
  const responsiveCanvasHeight = useMemo(
    () => CANVAS_HEIGHT * responsiveScale,
    [responsiveScale],
  );
  const responsiveCanvasWidth = useMemo(
    () => CANVAS_WIDTH * responsiveScale,
    [responsiveScale],
  );

  const progress = useLoop({ duration: 3000, easing: Easing.cubic });

  const start = useComputedValue(
    () =>
      add(
        vec(0, 0),
        vec(mix(progress.current, 0, 50), mix(progress.current, 0, 100)),
      ),
    [progress],
  );
  const end = useComputedValue(
    () =>
      add(
        vec(HEADER_HEIGHT, 0),
        vec(
          mix(progress.current, 0, CANVAS_WIDTH),
          mix(progress.current, 0, CANVAS_WIDTH),
        ),
      ),
    [progress],
  );
  const dispatch = useAppDispatch();

  const rootNavigation = useRootNavigation();
  const onLogout = useCallback(() => {
    Alert.alert("Cerrar Sesión", "¿Seguro que quieres cerrar sesión?", [
      {
        text: "Si",
        onPress: () => dispatch(logoutAuth0()),
        style: "destructive",
      },
      {
        text: "No",
        style: "cancel",
      },
    ]);
  }, [dispatch]);
  const onOptions = useOptionsSheet(
    {
      Configuración: {
        action: () =>
          rootNavigation.navigate(RootNavigationRoutes.User, {
            screen: UserNavigationRoutes.OwnUserConfig,
          }),
      },
      "Cerrar Sesión": {
        action: onLogout,
      },
    },
    { destructiveButtonIndex: 1 },
  );

  const { isOfflineMode, setIsOfflineMode } = useOfflineMode();

  return (
    <Screen
      flex={0}
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      borderBottomWidth={1}
      safeAreaDisabled
      width={SCREEN_WIDTH}
      borderBottomColor="grayscale.400"
    >
      <Canvas style={styles.canvas}>
        <FitBox
          src={rect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)}
          dst={rect(
            HEADER_HEIGHT / 6,
            HEADER_HEIGHT - responsiveCanvasHeight - HEADER_HEIGHT / 6,
            responsiveCanvasWidth,
            responsiveCanvasHeight,
          )}
        >
          <Group clip={pathTitle.path}>
            <Rect x={0} y={0} width={CANVAS_WIDTH} height={16}>
              <LinearGradient
                start={start}
                end={end}
                colors={[theme.colors.gradientB, theme.colors.gradientA]}
              />
            </Rect>
          </Group>
        </FitBox>
      </Canvas>

      <Box
        justifyContent="center"
        alignItems="flex-end"
        flexDirection="row"
        height="100%"
        style={styles.header}
      >
        <Ionicons
          name={isOfflineMode ? "md-airplane-sharp" : "md-airplane-outline"}
          color={theme.colors["grayscale.600"]}
          size={30}
          style={{ paddingRight: 8 }}
          onPress={setIsOfflineMode}
        />
        <Pressable
          justifyContent="center"
          alignItems={"center"}
          onPress={onOptions}
        >
          <UserProfileImage
            publicId={profilePhoto?.publicId || undefined}
            style={styles.image}
            marginLeft="s"
          />
        </Pressable>
      </Box>
    </Screen>
  );
};

export default UserHeader;

const styles = StyleSheet.create({
  canvas: {
    flex: 1,
    height: HEADER_HEIGHT,
  },
  header: {
    marginBottom: HEADER_HEIGHT / 4,
    marginRight: HEADER_HEIGHT / 6,
  },
  image: {
    width: HEADER_HEIGHT / 2.5,
    height: HEADER_HEIGHT / 2.5,
    borderRadius: HEADER_HEIGHT,
  },
});
