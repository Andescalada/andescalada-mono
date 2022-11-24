import {
  BlurMask,
  Canvas,
  Easing,
  FitBox,
  Group,
  LinearGradient,
  mix,
  Path,
  Rect,
  rect,
  sub,
  useComputedValue,
  useLoop,
  useTiming,
  vec,
} from "@shopify/react-native-skia";
import { useTheme } from "@shopify/restyle";
import React, { FC } from "react";
import { Dimensions } from "react-native";

import pathLogo from "../assets/andescaladaPathLogo";
import pathTitle from "../assets/andescaladaPathLTitleUppercase";
import { Theme } from "../Theme/theme";

const SCALE = 1;
const DURATION = 2000;

const ORIGINAL_LOGO_WIDTH = pathLogo.width;
const ORIGINAL_LOGO_HEIGHT = pathLogo.height;
const LOGO_WIDTH = 123 * SCALE;
const LOGO_HEIGHT = 123 * pathLogo.aspectRatio * SCALE;

const ORIGINAL_TITLE_WIDTH = pathTitle.width;
const ORIGINAL_TITLE_HEIGHT = pathTitle.height;
const TITLE_WIDTH = 261 * SCALE;
const TITLE_HEIGHT = 261 * pathTitle.aspectRatio * SCALE;

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

interface Props {
  withLogo?: boolean;
}

const AnimatedBackground: FC<Props> = ({ withLogo = false }) => {
  const theme = useTheme<Theme>();
  const loop = useLoop({ duration: DURATION, easing: Easing.cubic });
  const blur = useTiming(
    { from: 100, to: 0 },
    { duration: DURATION, easing: Easing.inOut(Easing.linear) },
  );

  const start = useComputedValue(
    () =>
      sub(vec(0, 0), vec(mix(loop.current, 0, 3 * SCREEN_WIDTH * Math.PI), 0)),
    [loop],
  );
  const end = useComputedValue(
    () =>
      sub(
        vec(SCREEN_HEIGHT, 0),
        vec(0, mix(loop.current, 0, 2 * SCREEN_HEIGHT * Math.PI)),
      ),
    [loop],
  );
  return (
    <Canvas
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      }}
    >
      <Rect x={0} y={0} width={SCREEN_WIDTH} height={SCREEN_HEIGHT}>
        <LinearGradient
          start={start}
          end={end}
          colors={[theme.colors.gradientA, theme.colors.gradientB]}
        />
      </Rect>
      {withLogo && (
        <Group>
          <FitBox
            src={rect(0, 0, ORIGINAL_LOGO_WIDTH, ORIGINAL_LOGO_HEIGHT)}
            dst={rect(
              SCREEN_WIDTH / 2 - LOGO_WIDTH / 2,
              SCREEN_HEIGHT / 2 - LOGO_HEIGHT,
              LOGO_WIDTH,
              LOGO_HEIGHT,
            )}
          >
            <Path path={pathLogo.path} color={theme.colors["grayscale.white"]}>
              <BlurMask blur={blur} style="outer" />
            </Path>
          </FitBox>
          <FitBox
            src={rect(
              ORIGINAL_TITLE_WIDTH / 2,
              ORIGINAL_TITLE_HEIGHT / 2,
              ORIGINAL_TITLE_WIDTH,
              ORIGINAL_TITLE_HEIGHT,
            )}
            dst={rect(
              SCREEN_WIDTH / 2,
              SCREEN_HEIGHT / 2 - TITLE_HEIGHT / 2 + 12.68,
              TITLE_WIDTH,
              TITLE_HEIGHT,
            )}
          >
            <Path path={pathTitle.path} color={theme.colors["grayscale.white"]}>
              <BlurMask blur={blur} style="outer" />
            </Path>
          </FitBox>
        </Group>
      )}
    </Canvas>
  );
};

export default AnimatedBackground;
