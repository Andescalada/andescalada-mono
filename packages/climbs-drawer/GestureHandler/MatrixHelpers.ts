import { Dimensions } from "react-native";
import {
  identity4,
  Matrix4,
  multiply4,
  processTransform3d,
  Transforms3d,
  Vec3,
} from "react-native-redash";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

export const vec3 = (x: number, y: number, z: number) => [x, y, z] as const;

export const initial4 = ({
  height,
  width,
}: {
  height: number;
  width: number;
}) => {
  "worklet";
  const scale = SCREEN_WIDTH / width;
  const translateY = (SCREEN_HEIGHT - height * scale) / 2;
  return multiply4(identity4, processTransform3d([{ translateY }, { scale }]));
};

export const transformOrigin3d = (
  origin: Vec3,
  transform: Transforms3d,
): Transforms3d => {
  "worklet";
  return [
    { translateX: origin[0] },
    { translateY: origin[1] },
    { translateZ: origin[2] },
    ...transform,
    { translateX: -origin[0] },
    { translateY: -origin[1] },
    { translateZ: -origin[2] },
  ];
};

export const concat = (m: Matrix4, origin: Vec3, transform: Transforms3d) => {
  "worklet";
  return multiply4(m, processTransform3d(transformOrigin3d(origin, transform)));
};
