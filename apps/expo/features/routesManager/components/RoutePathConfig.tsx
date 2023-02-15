import { A, Box, Ionicons, Pressable } from "@andescalada/ui";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { setShowRoutes } from "@store/localConfigs";
import { FC } from "react";
import { SlideInRight, SlideOutRight } from "react-native-reanimated";

interface Props {
  show: boolean;
  setShow: (show: boolean) => void;
}

const RoutePathConfig: FC<Props> = ({ show, setShow }) => {
  const dispatch = useAppDispatch();
  const { showRoutes } = useAppSelector((state) => state.localConfig);

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
          <Pressable onPress={() => dispatch(setShowRoutes())}>
            <Ionicons
              name={showRoutes ? "eye-off" : "eye"}
              size={30}
              color="grayscale.black"
            />
          </Pressable>
        </Box>
      </A.Box>
    );
  }
  return <Box />;
};

export default RoutePathConfig;
