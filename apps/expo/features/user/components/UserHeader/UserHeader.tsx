import { Box, Ionicons, Pressable, Screen } from "@andescalada/ui";
import pathTitle from "@assets/andescaladaPathTitle";
import { UserNavigationRoutes } from "@features/user/Navigation/types";
import { ZoneManagerRoutes } from "@features/zoneManager/Navigation/types";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { useAppTheme } from "@hooks/useAppTheme";
import useOfflineMode from "@hooks/useOfflineMode";
import useOptionsSheet from "@hooks/useOptionsSheet";
import useOwnInfo from "@hooks/useOwnInfo";
import useRootNavigation from "@hooks/useRootNavigation";
import { RootNavigationRoutes } from "@navigation/AppNavigation/RootNavigation/types";
import {
  Canvas,
  FitBox,
  Group,
  LinearGradient,
  Rect,
  rect,
  Skia,
  vec,
} from "@shopify/react-native-skia";
import { useResponsiveProp } from "@shopify/restyle";
import { logoutAuth0 } from "@store/auth";
import UserProfileImage from "@templates/UserProfileImage/UserProfileImage";
import featureFlags from "@utils/featureFlags";
import { useCallback, useMemo } from "react";
import { Alert, StyleSheet, useWindowDimensions } from "react-native";

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
            screen: UserNavigationRoutes.Settings,
          }),
      },
      "Administrador de zonas": {
        action: () => {
          rootNavigation.navigate(RootNavigationRoutes.ZoneManager, {
            screen: ZoneManagerRoutes.ZonesByRole,
          });
        },
        hide: !featureFlags.addZoneFlow,
      },
      "Cerrar Sesión": {
        action: onLogout,
      },
    },
    { destructiveButtonIndex: 2 },
  );

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const andescaladaPath = Skia.Path.MakeFromSVGString(pathTitle.path)!;

  const { isOfflineMode, setIsOfflineMode } = useOfflineMode();

  const { newNotification } = useAppSelector((state) => state.localConfig);

  const { width: screenWidth } = useWindowDimensions();

  return (
    <Screen
      flex={0}
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      borderBottomWidth={1}
      safeAreaDisabled
      width={screenWidth}
      borderBottomColor="grayscale.400"
    >
      <Canvas style={styles.canvas} mode="continuous">
        <FitBox
          src={rect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)}
          dst={rect(
            HEADER_HEIGHT / 6,
            HEADER_HEIGHT - responsiveCanvasHeight - HEADER_HEIGHT / 6,
            responsiveCanvasWidth,
            responsiveCanvasHeight,
          )}
        >
          <Group clip={andescaladaPath}>
            <Rect x={0} y={0} width={CANVAS_WIDTH} height={16}>
              <LinearGradient
                start={vec(0, 0)}
                end={vec(HEADER_HEIGHT, CANVAS_WIDTH / 5)}
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
          name={
            isOfflineMode
              ? "md-arrow-down-circle-sharp"
              : "md-arrow-down-circle-outline"
          }
          color="grayscale.600"
          size={30}
          style={{ paddingRight: 8 }}
          onPress={setIsOfflineMode}
        />
        <Box alignItems="center" justifyContent="center">
          <Ionicons
            name="notifications-outline"
            color="grayscale.600"
            size={30}
            onPress={() =>
              rootNavigation.navigate(RootNavigationRoutes.User, {
                screen: UserNavigationRoutes.Notifications,
              })
            }
          />
          {newNotification && (
            <Box
              height={10}
              width={10}
              borderRadius={5}
              borderColor="background"
              borderWidth={2}
              position="absolute"
              top={5}
              right={5}
              backgroundColor="semantic.error"
            />
          )}
        </Box>
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
