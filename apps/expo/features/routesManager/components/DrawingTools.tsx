import { A, Button, Ionicons, Pressable, Text } from "@andescalada/ui";
import {
  ComponentProps,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { FadeIn, FadeOut } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  canSave: boolean;
  showConfig: boolean;
  setShowConfig: Dispatch<SetStateAction<boolean>>;
  showRoutes: boolean;
  setShowRoutes: Dispatch<SetStateAction<boolean>>;
  onFinishOrSave: (params?: { addNewRoute: boolean }) => void;
  isLoading: boolean;
  onUndo: () => void;
  onReset: () => void;
  isMultiPitch?: boolean;
  onDisconnect?: () => void;
  isDisconnected?: boolean;
  canDisconnect?: boolean;
  onLabelMovement?: () => void;
  labelCanMove?: boolean;
  labelOnScreen?: boolean;
  showSaveAndAddButton?: boolean;
}

const DrawingTools = ({
  showConfig,
  canSave,
  isLoading,
  onFinishOrSave,
  onDisconnect,
  onReset,
  setShowConfig,
  showRoutes,
  setShowRoutes,
  onUndo,
  onLabelMovement,
  isDisconnected = false,
  isMultiPitch = false,
  canDisconnect = false,
  labelCanMove = false,
  labelOnScreen = false,
  showSaveAndAddButton = false,
}: Props) => {
  const inset = useSafeAreaInsets();

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
          alignItems="flex-end"
        >
          <Button
            title={canSave ? "Guardar" : "Finalizar"}
            variant={canSave ? "success" : "error"}
            titleVariant="p2R"
            titleProps={{ lineHeight: 20, textAlign: "center" }}
            isLoading={isLoading}
            onPress={() => onFinishOrSave()}
          />
          {canSave && showSaveAndAddButton && (
            <Button
              mt="s"
              bg="grayscale.white"
              variant="successSmallOutline"
              title="Guardar y seguir agregando"
              titleVariant="p3R"
              p="s"
              titleProps={{ lineHeight: 20, textAlign: "center" }}
              onPress={() => onFinishOrSave({ addNewRoute: true })}
            />
          )}
        </A.Box>
      )}
      {labelCanMove && (
        <A.Box
          position="absolute"
          bottom={150}
          right={0}
          left={0}
          flex={1}
          justifyContent="center"
          alignItems="center"
        >
          <A.Box
            bg="semantic.warning"
            padding="s"
            borderRadius={20}
            entering={FadeIn}
            exiting={FadeOut}
          >
            <Text color="grayscale.black"> Zoom fijo</Text>
          </A.Box>
        </A.Box>
      )}
      <A.ScrollView
        position="absolute"
        bottom={0}
        right={0}
        left={0}
        paddingTop="m"
        style={{ paddingBottom: inset.bottom + 16 }}
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
          active={showConfig}
          onPress={() => {
            setShowConfig((prev) => !prev);
          }}
        />
        <ToolItem
          title={showRoutes ? "Ocultar" : "Mostrar"}
          secondLine="otras"
          active={!showRoutes}
          iconName={showRoutes ? "eye-off" : "eye"}
          onPress={() => {
            setShowRoutes((prev) => !prev);
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
            {labelOnScreen && (
              <ToolItem
                title={labelCanMove ? "Fijar" : "Mover"}
                active={labelCanMove}
                secondLine="etiqueta"
                iconName={"ellipse-sharp"}
                marginRight="l"
                onPress={onLabelMovement}
              />
            )}
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
  active?: boolean;
}

const ToolItem = ({
  iconName,
  secondLine,
  title,
  active: activeProp,
  ...props
}: ToolItemProps) => {
  const [localActive, setLocalActive] = useState(activeProp);
  useEffect(() => {
    if (activeProp !== undefined) setLocalActive(activeProp);
  }, [activeProp]);
  return (
    <Pressable
      alignItems="center"
      marginRight="m"
      minWidth={50}
      onPressIn={() => {
        if (activeProp === undefined) setLocalActive(true);
      }}
      onPressOut={() => {
        if (activeProp === undefined) setLocalActive(false);
      }}
      {...props}
    >
      <Ionicons
        name={iconName}
        size={30}
        color={localActive ? "brand.primaryA" : "transparentButtonText"}
      />
      <Text
        marginTop="s"
        color={localActive ? "brand.primaryA" : "transparentButtonText"}
        numberOfLines={1}
        textAlign="center"
      >
        {title}
      </Text>
      {secondLine && (
        <Text
          color={localActive ? "brand.primaryA" : "transparentButtonText"}
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
