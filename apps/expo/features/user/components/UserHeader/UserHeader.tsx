import { Box, Image, Screen, Text } from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import { images } from "@assets/images";
import { andescaladaPathTitle } from "@features/user/components/UserHeader/AndescaladaPathTitle";
import { useAppTheme } from "@hooks/useAppTheme";
import useCachedImage from "@hooks/useCachedImage";
import {
  add,
  Canvas,
  Easing,
  Group,
  LinearGradient,
  mix,
  Rect,
  useComputedValue,
  useLoop,
  useValue,
  vec,
} from "@shopify/react-native-skia";
import { getThumbnail } from "@utils/cloudinary";

// eslint-disable-next-line @typescript-eslint/no-var-requires

const CANVAS_HEIGHT = 40;
const CANVAS_WIDTH = 150;

const UserHeader = () => {
  const { data } = trpc.user.ownInfo.useQuery();
  const { name, profilePhoto } = data || {};

  const theme = useAppTheme();

  const translate = useValue([
    { translateY: CANVAS_HEIGHT / 2 },
    { translateX: 0 },
  ]);

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
        vec(CANVAS_HEIGHT, 0),
        vec(
          mix(progress.current, 0, CANVAS_WIDTH),
          mix(progress.current, 0, CANVAS_WIDTH),
        ),
      ),
    [progress],
  );

  const image = getThumbnail(profilePhoto?.publicId || undefined);
  const { uri } = useCachedImage(image);

  return (
    <Screen
      flex={0}
      flexDirection={"row"}
      alignItems="center"
      justifyContent="space-between"
      borderBottomWidth={1}
      height={100}
      safeAreaDisabled
      borderBottomColor="buttonGroup"
    >
      <Canvas
        style={{
          flex: 1,
          height: CANVAS_HEIGHT,
          marginTop: 5,
          marginLeft: 60,
          transform: [{ scale: 1.4 }],
        }}
      >
        <Group clip={andescaladaPathTitle} transform={translate}>
          <Rect x={0} y={0} width={CANVAS_WIDTH} height={CANVAS_HEIGHT}>
            <LinearGradient
              start={start}
              end={end}
              colors={[theme.colors.gradientB, theme.colors.gradientA]}
            />
          </Rect>
        </Group>
      </Canvas>
      {/* <Text variant="h2">Andescalda</Text> */}
      <Box
        justifyContent="center"
        alignItems="center"
        flexDirection="row"
        marginTop={"l"}
        marginRight="l"
      >
        <Text variant="h3">{name}</Text>
        <Image
          source={uri ? uri : images.placeholder}
          style={{ width: 40, height: 40, borderRadius: 100 }}
          marginLeft="m"
        />
      </Box>
    </Screen>
  );
};

export default UserHeader;
