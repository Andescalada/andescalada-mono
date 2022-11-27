import { SkiaRouteRef } from "@andescalada/climbs-drawer/SkiaRoutePathDrawer/SkiaRoutePathDrawer";
import { A, Box, Button } from "@andescalada/ui";
import { RefObject } from "react";
import { FadeIn, FadeOut } from "react-native-reanimated";

interface Props {
  routeRef: RefObject<SkiaRouteRef>;
  canSave: boolean;
  setCanSave: (canSave: boolean) => void;
  showConfig: boolean;
  setShowConfig: (show: boolean) => void;
  onFinishOrSave: () => void;
  isLoading: boolean;
  onUndo: () => void;
}

const DrawingTools = ({
  showConfig,
  canSave,
  setCanSave,
  isLoading,
  onFinishOrSave,
  routeRef,
  setShowConfig,
  onUndo,
}: Props) => {
  if (!showConfig)
    return (
      <A.Box
        position="absolute"
        top={50}
        right={0}
        margin="l"
        entering={FadeIn}
        exiting={FadeOut}
      >
        <Button
          title={canSave ? "Guardar" : "Finalizar"}
          variant={canSave ? "success" : "error"}
          titleVariant={"p1R"}
          isLoading={isLoading}
          onPress={onFinishOrSave}
        />
        <Button
          title="Deshacer"
          variant={"transparent"}
          titleVariant={"p1R"}
          marginTop="s"
          onPress={onUndo}
        />
        <Button
          title="Borrar"
          variant={"transparent"}
          titleVariant={"p1R"}
          marginTop="s"
          onPress={() => {
            routeRef?.current?.reset();
            setCanSave(false);
          }}
        />
        <Button
          title="Config"
          variant={"transparent"}
          titleVariant={"p1R"}
          marginTop="s"
          onPress={() => {
            setShowConfig(true);
          }}
        />
      </A.Box>
    );
  return <Box />;
};

export default DrawingTools;
