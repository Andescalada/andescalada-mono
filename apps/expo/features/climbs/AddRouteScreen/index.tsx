import {
  Box,
  Button,
  Pressable,
  Screen,
  SemanticButton,
  Text,
  TextInput,
} from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import {
  ClimbsNavigationRoutes,
  ClimbsNavigationScreenProps,
} from "@features/climbs/Navigation/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { createContext, FC, useContext } from "react";
import { useController, useForm } from "react-hook-form";
import { Alert } from "react-native";
import { z } from "zod";

const RouteKind = {
  Sport: "Sport",
  Trad: "Trad",
  Boulder: "Boulder",
  Mixed: "Mixed",
  Ice: "Ice",
};

type Props = ClimbsNavigationScreenProps<ClimbsNavigationRoutes.AddRoute>;

const schema = z.object({
  routeName: z
    .string({ required_error: "Requerido" })
    .min(3, "Nombre muy corto")
    .max(50, "Nombre muy largo"),
  kind: z.nativeEnum(RouteKind, { required_error: "Requerido" }),
});

type Form = z.infer<typeof schema>;

const AddRouteScreen: FC<Props> = ({ route, navigation }) => {
  const { wallId } = route.params;
  const utils = trpc.useContext();
  const { mutate, isLoading } = trpc.routes.add.useMutation({
    onSuccess: () => {
      navigation.goBack();
      utils.walls.byId.invalidate(route.params.wallId);
    },
  });

  const {
    handleSubmit,
    control,
    formState: { isDirty },
  } = useForm<Form>({
    resolver: zodResolver(schema),
  });

  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    control,
    name: "routeName",
  });
  const {
    field: { onChange: onKindChange, value: kindValue },
    fieldState: { error: kindError },
  } = useController({
    control,
    name: "kind",
  });

  const onSubmit = handleSubmit((input) => {
    mutate({ wallId, name: input.routeName, kind: "Boulder" });
  });

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

  return (
    <Screen padding="m">
      <Text variant="h1">Agregar ruta</Text>
      <Box marginTop={"m"}>
        <Text variant={"p1R"} marginBottom={"s"}>
          Nombre de la ruta
        </Text>
        <TextInput
          value={value}
          onChangeText={onChange}
          containerProps={{ height: 50 }}
          textAlignVertical="center"
        />
        <Text marginTop={"xs"} color="error">
          {error?.message}
        </Text>
      </Box>
      <Text variant={"p1R"} marginBottom={"s"}>
        Tipo de ruta
      </Text>
      <ButtonGroup value={kindValue} onChange={onKindChange}>
        <Box flexWrap="wrap" flexDirection="row">
          <ButtonItem value={RouteKind.Sport} label="Deportiva" />
          <ButtonItem value={RouteKind.Boulder} label="Boulder" />
          <ButtonItem value={RouteKind.Trad} label="Tradicional" />
          <ButtonItem value={RouteKind.Mixed} label="Mixta" />
          <ButtonItem value={RouteKind.Ice} label="Hielo" />
        </Box>
        <Text marginTop={"xs"} color="error">
          {kindError?.message}
        </Text>
      </ButtonGroup>
      <Button
        variant="primary"
        title="Agregar"
        onPress={onSubmit}
        isLoading={isLoading}
        marginVertical="s"
      />
      <SemanticButton variant="error" title="Cancelar" onPress={onCancel} />
    </Screen>
  );
};

export default AddRouteScreen;

interface ButtonItemProps {
  label: string;
  value: string | number | undefined;
}

const ButtonItem: FC<ButtonItemProps> = ({ label, value: localValue }) => {
  const { value, onChange } = useButtonGroup();
  const isSelected = value === localValue;
  return (
    <Pressable
      onPress={() => {
        if (isSelected) {
          onChange(undefined);
          return;
        }
        onChange(localValue);
      }}
      padding="m"
      margin={"s"}
      backgroundColor={isSelected ? "selectedButtonGroup" : "buttonGroup"}
      borderRadius={100}
    >
      <Text variant={isSelected ? "p2B" : "p2R"}>{label}</Text>
    </Pressable>
  );
};

interface ButtonGroupProps {
  value: string | number | undefined;
  onChange: (v: string | number | undefined) => void;
}

const ButtonGroupContext = createContext<ButtonGroupProps | null>(null);

const ButtonGroup: FC<ButtonGroupProps> = ({ children, value, onChange }) => {
  return (
    <ButtonGroupContext.Provider value={{ value, onChange }}>
      {children}
    </ButtonGroupContext.Provider>
  );
};

const useButtonGroup = () => {
  const methods = useContext(ButtonGroupContext);

  return methods as unknown as ButtonGroupProps;
};
