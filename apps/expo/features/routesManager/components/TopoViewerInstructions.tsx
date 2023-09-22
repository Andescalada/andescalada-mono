import { A, Box, Colors, Ionicons, Pressable, Text } from "@andescalada/ui";
import { useAppTheme } from "@hooks/useAppTheme";
import { atomWithMMKV, Storage } from "@utils/mmkv/storage";
import { atom, useAtom } from "jotai";
import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import { FadeIn, FadeOut } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Path, Svg, SvgProps } from "react-native-svg";

interface Props {
  timeout?: number;
  show?: boolean;
  setShow?: Dispatch<SetStateAction<boolean>>;
}

export const skipTopoInstructions = atomWithMMKV(
  Storage.SKIP_TOPO_INSTRUCTIONS,
  false,
);

export const showAtom = atom(true);
export const forceShow = atom(false);

const TopoViewerInstructions: FC<Props> = ({
  timeout = 2000,
  show: forceShow,
  setShow: forceSetShow,
}) => {
  const [skip, setSkip] = useAtom(skipTopoInstructions);
  const [show, setShow] = useState(true);

  console.log({ skip, forceShow, show });

  useEffect(() => {
    setTimeout(() => setShow(false), timeout);
  }, []);

  const insets = useSafeAreaInsets();

  if (skip && !forceShow) return null;

  if (!show && !forceShow) return null;

  return (
    <A.Box
      flex={1}
      position="absolute"
      top={insets.top ?? 30}
      left={0}
      right={0}
      bottom={0}
      zIndex={100}
      bg="grayscale.transparent.95.black"
      entering={FadeIn}
      exiting={FadeOut}
      padding="m"
      gap="l"
      justifyContent="center"
    >
      <Pressable
        position="absolute"
        right={0}
        top={0}
        zIndex={300}
        padding="m"
        onPress={() => {
          setShow(false);
          forceSetShow?.(false);
        }}
      >
        <Ionicons name="close" size={40} />
      </Pressable>
      <Box flexDirection="row" alignItems="center" gap="s">
        <PointingFinger size={40} />
        <Text variant="p2R">Presiona la ruta para seleccionarla.</Text>
      </Box>
      <Box flexDirection="row" alignItems="center" gap="s">
        <Box
          width={50}
          height={40}
          borderRadius={8}
          borderColor="grayscale.white"
          bg="grayscale.transparent.80.black"
          borderWidth={2}
          paddingHorizontal="xs"
          justifyContent="center"
          alignItems="flex-start"
        >
          <Box
            width={30}
            height={30}
            borderRadius={15}
            borderWidth={3}
            borderColor="drawingRoutePath"
            bg="grayscale.white"
            justifyContent="center"
            alignItems="center"
          >
            <Text
              lineHeight={25}
              fontSize={15}
              color="grayscale.black"
              fontFamily="Rubik-700"
            >
              1
            </Text>
          </Box>
        </Box>
        <Box flex={1}>
          <Text variant="p2R">
            Presiona el nombre de la ruta para tener más información.
          </Text>
        </Box>
      </Box>
      <Box flexDirection="row" alignItems="center" gap="s">
        <Ionicons name="options-outline" size={30} color="grayscale.white" />
        <Box flex={1}>
          <Text variant="p2R">
            Presiona el botón de configuración para abrir la barra de opciones.
          </Text>
        </Box>
      </Box>
      <Pressable
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        marginTop="xxl"
        onPress={() => {
          setSkip((prev) => !prev);
        }}
      >
        <Ionicons name={skip ? "checkbox" : "stop-outline"} size={25} />
        <Text variant="p2R" marginLeft="s">
          No mostrar más
        </Text>
      </Pressable>
    </A.Box>
  );
};

const PointingFinger = ({
  size = 24,
  ...props
}: SvgProps & { size?: number; color?: Colors }) => {
  const theme = useAppTheme();

  const themeColor = useMemo(
    () => theme.colors[props.color || "grayscale.white"],
    [props.color, theme.colors],
  );
  return (
    <Svg
      data-name="Layer 1"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={themeColor}
      {...props}
    >
      <Path d="M17.98 9.376L12 8.18V3.107A3.081 3.081 0 009.5.041 3 3 0 006 3v6.661L3.211 13.3a5.021 5.021 0 00.249 6.794l2.4 2.425A5.036 5.036 0 009.414 24H17a5.006 5.006 0 005-5v-4.721a5.013 5.013 0 00-4.02-4.903zM20 19a3 3 0 01-3 3H9.414a3.022 3.022 0 01-2.134-.891l-2.4-2.428a3.03 3.03 0 01-.116-4.123L6 12.945V17a1 1 0 002 0V3a1 1 0 011.176-.985A1.082 1.082 0 0110 3.107V9a1 1 0 00.8.98l6.784 1.357A3.01 3.01 0 0120 14.279z" />
    </Svg>
  );
};

export default TopoViewerInstructions;
