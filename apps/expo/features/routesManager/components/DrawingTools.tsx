import { A, Button, Ionicons, Pressable, Text } from "@andescalada/ui";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { setShowRoutes } from "@store/localConfigs";
import { ComponentProps, Dispatch, SetStateAction } from "react";
import { FadeIn, FadeOut } from "react-native-reanimated";

interface Props {
  canSave: boolean;
  showConfig: boolean;
  setShowConfig: Dispatch<SetStateAction<boolean>>;
  onFinishOrSave: () => void;
  isLoading: boolean;
  onUndo: () => void;
  onReset: () => void;
}

const DrawingTools = ({
  showConfig,
  canSave,
  isLoading,
  onFinishOrSave,
  onReset,
  setShowConfig,
  onUndo,
}: Props) => {
  const dispatch = useAppDispatch();
  const { showRoutes } = useAppSelector((state) => state.localConfig);

  return (
    <>
      {!showConfig && (
        <A.Box
          position="absolute"
          top={50}
          margin="l"
          right={0}
          entering={FadeIn}
          exiting={FadeOut}
          justifyContent="center"
          alignItems="center"
          height={50}
        >
          <Button
            title={canSave ? "Guardar" : "Finalizar"}
            variant={canSave ? "success" : "error"}
            titleVariant="p2R"
            titleProps={{ lineHeight: 20, textAlign: "center" }}
            isLoading={isLoading}
            onPress={onFinishOrSave}
          />
        </A.Box>
      )}
      <A.ScrollView
        position="absolute"
        bottom={0}
        right={0}
        left={0}
        padding="s"
        paddingBottom="xl"
        paddingLeft="m"
        entering={FadeIn}
        exiting={FadeOut}
        horizontal
        showsHorizontalScrollIndicator={false}
        flexDirection="row"
        backgroundColor="transparentButtonBackground"
      >
        <ToolItem
          title="Deshacer"
          iconName="arrow-undo-sharp"
          onPress={onUndo}
        />
        <ToolItem title="Borrar" iconName="trash-sharp" onPress={onReset} />
        <ToolItem
          title="Trazo"
          iconName="pencil-sharp"
          onPress={() => {
            setShowConfig((prev) => !prev);
          }}
        />
        <ToolItem
          title={showRoutes ? "Ocultar" : "Mostrar"}
          iconName={showRoutes ? "eye-off" : "eye"}
          onPress={() => {
            dispatch(setShowRoutes());
          }}
        />
      </A.ScrollView>
    </>
  );
};

export default DrawingTools;

const ToolItem = ({
  iconName,
  onPress,
  title,
}: {
  onPress: () => void;
  iconName: ComponentProps<typeof Ionicons>["name"];
  title: string;
}) => {
  return (
    <Pressable
      alignItems="center"
      justifyContent="space-between"
      // padding="xs"
      marginRight="s"
      onPress={onPress}
      minWidth={50}
    >
      <Ionicons name={iconName} size={30} color="transparentButtonText" />
      <Text
        marginTop="s"
        color="transparentButtonText"
        numberOfLines={1}
        textAlign="center"
      >
        {title}
      </Text>
    </Pressable>
  );
};
