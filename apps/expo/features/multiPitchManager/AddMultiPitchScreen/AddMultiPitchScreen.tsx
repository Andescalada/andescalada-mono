import route from "@andescalada/api/schemas/route";
import useZodForm from "@andescalada/hooks/useZodForm";
import {
  A,
  Box,
  Button,
  Ionicons,
  Screen,
  ScrollView,
  SemanticButton,
  Text,
  TextButton,
  TextInput,
} from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import {
  MultiPitchManagerRoutes,
  MultiPitchManagerScreenProps,
} from "@features/multiPitchManager/Navigation/types";
import useRootNavigation from "@hooks/useRootNavigation";
import { RootNavigationRoutes } from "@navigation/AppNavigation/RootNavigation/types";
import { FC, useMemo, useState } from "react";
import { useController } from "react-hook-form";
import { Alert, Keyboard } from "react-native";
import { FadeIn, FadeOut } from "react-native-reanimated";

type Props =
  MultiPitchManagerScreenProps<MultiPitchManagerRoutes.AddMultiPitch>;

const schema = route.schema.pick({ name: true, unknownName: true });

const AddMultiPitchScreen: FC<Props> = ({
  navigation,
  route: {
    params: {
      zoneId,
      wallId,
      multiPitchName,
      unknownName: defaultUnknownName,
      multiPitchId,
    },
  },
}) => {
  const text = useMemo(() => {
    if (!!multiPitchName || !!defaultUnknownName) {
      return {
        isEditing: true,
        title: "Editar multi largo",
        buttonTitle: "Editar",
      };
    }
    return {
      isEditing: false,
      title: "Agregar multi largo",
      buttonTitle: "Editar",
    };
  }, [multiPitchName, defaultUnknownName]);
  const {
    handleSubmit,
    control,
    formState: { isDirty },
  } = useZodForm({
    schema,
    defaultValues: { name: multiPitchName, unknownName: defaultUnknownName },
  });
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    control,
    name: "name",
  });
  const {
    field: { onChange: unknownNameOnChange, value: unknownName },
  } = useController({
    control,
    name: "unknownName",
  });
  const nameRouteHandler = () => {
    onChange("");
    unknownNameOnChange(false);
  };
  const [showNoName, setShowNoName] = useState(true);

  const onUnknownNamePress = () => {
    onChange("Multi largo sin nombre");
    unknownNameOnChange(true);
  };

  const onCancel = () => {
    if (!isDirty) {
      navigation.goBack();
      return;
    }
    Alert.alert("¿Seguro que quieres cancelar?", "", [
      {
        text: "Si",
        onPress: () => navigation.goBack(),
      },
      {
        text: "Cancelar",
        style: "cancel",
      },
    ]);
  };

  const rootNavigation = useRootNavigation();

  const mainTopo = trpc.walls.mainTopo.useQuery({
    zoneId,
    wallId,
  });

  const utils = trpc.useContext();

  const { mutate, isLoading } = trpc.multiPitch.add.useMutation({
    onSuccess: ({ id, name }) => {
      utils.walls.invalidate();
      utils.multiPitch.invalidate();
      if (!mainTopo.data) return;
      rootNavigation.replace(RootNavigationRoutes.MultiPitchManager, {
        screen: MultiPitchManagerRoutes.MultiPitchManager,
        params: {
          multiPitchId: id,
          multiPitchName: name,
          zoneId,
          topoId: mainTopo.data,
          wallId,
        },
      });
    },
  });

  const onSubmit = handleSubmit(({ name, unknownName }) => {
    mutate({ name, unknownName, wallId, zoneId, multiPitchId });
  });

  return (
    <Screen>
      <ScrollView
        padding="m"
        paddingTop="l"
        flex={1}
        marginBottom={"l"}
        onResponderGrant={Keyboard.dismiss}
      >
        <Box>
          <Text variant="h1">{text.title}</Text>
          <Text variant={"p1R"} marginBottom={"s"} marginTop="m">
            Nombre multi largo
          </Text>
          <Box flexDirection="row" flex={1}>
            <Box flex={1}>
              <TextInput
                value={value}
                onChangeText={onChange}
                editable={unknownName !== true}
                onPressIn={() => {
                  if (!unknownName) setShowNoName(false);
                }}
                onBlur={() => {
                  setShowNoName(value === undefined || value === "");
                }}
                containerProps={{ height: 50, flex: 1, paddingLeft: "s" }}
                textAlignVertical="center"
                color={!unknownName ? "textContrast" : "grayscale.600"}
              />
              {!!unknownName && value && (
                <A.Box entering={FadeIn} exiting={FadeOut}>
                  <TextButton
                    variant="info"
                    marginTop="s"
                    onPress={nameRouteHandler}
                  >
                    Nombrar multi largo
                  </TextButton>
                </A.Box>
              )}
            </Box>
            {showNoName && !value && (
              <A.Pressable
                paddingHorizontal={"s"}
                onPress={onUnknownNamePress}
                height="100%"
                alignItems="center"
                justifyContent="center"
                entering={FadeIn}
                exiting={FadeOut}
              >
                <Ionicons
                  name="remove-circle"
                  size={24}
                  color={
                    unknownName
                      ? "semantic.info"
                      : "grayscale.transparent.50.500"
                  }
                />
                <Text
                  color={
                    unknownName
                      ? "semantic.info"
                      : "grayscale.transparent.50.500"
                  }
                >
                  Sin nombre
                </Text>
              </A.Pressable>
            )}
          </Box>
          <Text marginTop={"xs"} color="semantic.error">
            {error?.message}
          </Text>
        </Box>
        <Box>
          <Button
            variant="primary"
            title={text.buttonTitle}
            onPress={onSubmit}
            isLoading={isLoading}
            marginVertical="s"
          />
          <SemanticButton
            variant="error"
            title="Cancelar"
            onPress={onCancel}
            marginBottom="l"
          />
        </Box>
      </ScrollView>
    </Screen>
  );
};

export default AddMultiPitchScreen;
