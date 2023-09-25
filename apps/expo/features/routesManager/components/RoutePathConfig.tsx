import { A, Box, Ionicons, Pressable } from "@andescalada/ui";
import { Dispatch, FC, SetStateAction } from "react";
import { SlideInRight, SlideOutRight } from "react-native-reanimated";

interface Props {
  show: boolean;
  setShow: (show: boolean) => void;
  showRoutes: boolean;
  setShowRoutes: Dispatch<SetStateAction<boolean>>;
  showInstructions: boolean;
  setShowInstructions: Dispatch<SetStateAction<boolean>>;
}

const RoutePathConfig: FC<Props> = ({
  show,
  setShow,
  setShowRoutes,
  showRoutes,
  setShowInstructions,
}) => {
  if (show) {
    return (
      <A.Box
        position="absolute"
        top={50}
        right={0}
        margin="s"
        marginTop="l"
        flexDirection="row"
        entering={SlideInRight}
        exiting={SlideOutRight}
        backgroundColor={"transparentButtonBackground"}
        borderTopLeftRadius={100}
        borderBottomLeftRadius={100}
        padding="s"
      >
        <Pressable onPress={() => setShow(false)}>
          <Ionicons name="chevron-forward" size={30} color="grayscale.black" />
        </Pressable>
        <Box alignItems="center" justifyContent="center">
          <Pressable onPress={() => setShowRoutes((prev) => !prev)}>
            <Ionicons
              name={showRoutes ? "eye-off" : "eye"}
              size={30}
              color="grayscale.black"
            />
          </Pressable>
        </Box>
        <Box alignItems="center" justifyContent="center">
          <Pressable
            onPress={() => {
              setShowInstructions(true);
              setShow(false);
            }}
          >
            <Ionicons name={"information"} size={30} color="grayscale.black" />
          </Pressable>
        </Box>
      </A.Box>
    );
  }
  return <Box />;
};

export default RoutePathConfig;
