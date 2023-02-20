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
  isMultiPitch?: boolean;
  onDisconnect?: () => void;
  isDisconnected?: boolean;
  canDisconnect?: boolean;
}

const DrawingTools = ({
  showConfig,
  canSave,
  isLoading,
  onFinishOrSave,
  onDisconnect,
  onReset,
  setShowConfig,
  onUndo,
  isDisconnected = false,
  isMultiPitch = false,
  canDisconnect = false,
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
        paddingTop="m"
        paddingBottom="xl"
        paddingHorizontal="m"
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
          secondLine="otras"
          iconName={showRoutes ? "eye-off" : "eye"}
          onPress={() => {
            dispatch(setShowRoutes());
          }}
        />
        {isMultiPitch && (
          <>
            {canDisconnect && (
              <ToolItem
                title={isDisconnected ? "Conectar" : "Desconectar"}
                secondLine="inicio"
                iconName={"flag-sharp"}
                onPress={onDisconnect}
              />
            )}
            <ToolItem
              title="Mover"
              secondLine="etiqueta"
              iconName={"ellipse-sharp"}
              marginRight="l"
              onPress={() => {
                dispatch(setShowRoutes());
              }}
            />
          </>
        )}
      </A.ScrollView>
    </>
  );
};

export default DrawingTools;

interface ToolItemProps extends ComponentProps<typeof Pressable> {
  iconName: ComponentProps<typeof Ionicons>["name"];
  title: string;
  secondLine?: string;
}

const ToolItem = ({ iconName, secondLine, title, ...props }: ToolItemProps) => {
  return (
    <Pressable alignItems="center" marginRight="m" minWidth={50} {...props}>
      <Ionicons name={iconName} size={30} color="transparentButtonText" />
      <Text
        marginTop="s"
        color="transparentButtonText"
        numberOfLines={1}
        textAlign="center"
      >
        {title}
      </Text>
      {secondLine && (
        <Text
          color="transparentButtonText"
          numberOfLines={1}
          textAlign="center"
          lineHeight={undefined}
        >
          {secondLine}
        </Text>
      )}
    </Pressable>
  );
};
