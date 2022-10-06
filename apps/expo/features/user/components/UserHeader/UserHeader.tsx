import { Box, Image, Pressable, Screen } from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import { andescaladaPathTitle } from "@features/user/components/UserHeader/andescaladaPathTitle";
import { UserNavigationRoutes } from "@features/user/Navigation/types";
import { useAppDispatch } from "@hooks/redux";
import { useAppTheme } from "@hooks/useAppTheme";
import useCachedImage from "@hooks/useCachedImage";
import useOptionsSheet from "@hooks/useOptionsSheet";
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
import { getThumbnail } from "@utils/cloudinary";
import { SCREEN_WIDTH } from "@utils/Dimensions";
import { useCallback, useMemo } from "react";
import { Alert, StyleSheet } from "react-native";

const HEADER_HEIGHT = 100;
const CANVAS_WIDTH = 128;
const CANVAS_HEIGHT = 16;

const UserHeader = () => {
  const { data } = trpc.user.ownInfo.useQuery();
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
  const image = getThumbnail(profilePhoto?.publicId || undefined);
  const { uri } = useCachedImage(image);
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
          <Group clip={andescaladaPathTitle}>
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
        <Pressable
          justifyContent="center"
          alignItems={"center"}
          onPress={onOptions}
        >
          <Image source={uri} style={styles.image} marginLeft="s" />
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
