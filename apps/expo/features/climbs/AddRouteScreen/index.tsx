import {
  Box,
  Button,
  Pressable,
  Screen,
  ScrollView,
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
import { Picker } from "@react-native-picker/picker";
import { allGrades, gradeUnits } from "@utils/climbingGrades";
import { createContext, FC, ReactNode, useContext } from "react";
import { useController, useForm } from "react-hook-form";
import { Alert, Keyboard } from "react-native";
import { z } from "zod";

enum RouteKind {
  Sport = "Sport",
  Trad = "Trad",
  Boulder = "Boulder",
  Mixed = "Mixed",
  Ice = "Ice",
}

type Props = ClimbsNavigationScreenProps<ClimbsNavigationRoutes.AddRoute>;

const schema = z.object({
  name: z
    .string({ required_error: "Requerido" })
    .min(3, "Nombre muy corto")
    .max(50, "Nombre muy largo"),
  kind: z.nativeEnum(RouteKind, {
    required_error: "Requerido",
  }),
  grade: z.union([z.number().nullable(), z.literal("project")]),
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
    name: "name",
  });
  const {
    field: { onChange: onKindChange, value: kindValue },
    fieldState: { error: kindError },
  } = useController({
    control,
    name: "kind",
  });
  const {
    field: { onChange: onGradeChange, value: gradeValue, onBlur: onGradeBlur },
  } = useController({
    control,
    name: "grade",
  });

  const onSubmit = handleSubmit((input) => {
    const grade = {
      grade: input.grade !== "project" ? input.grade : null,
      project: input.grade === "project",
    };
    mutate({ wallId, name: input.name, kind: input.kind, grade });
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
    <Screen>
      <ScrollView flex={1} padding="m" onResponderGrant={Keyboard.dismiss}>
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
        <Box>
          <Text variant={"p1R"} marginBottom={"s"}>
            Grado
          </Text>
          <Picker
            onValueChange={onGradeChange}
            selectedValue={gradeValue}
            onBlur={onGradeBlur}
            mode="dialog"
          >
            {allGrades.map((n) => (
              <Picker.Item
                color="white"
                fontFamily="Rubik-400"
                key={n}
                label={gradeUnits.FrenchGrade[n]}
                value={n}
              />
            ))}
            <Picker.Item
              color="white"
              fontFamily="Rubik-400"
              label={"Desconocido"}
              value={null}
            />
            <Picker.Item
              color="white"
              fontFamily="Rubik-400"
              label={"Proyecto"}
              value={"project"}
            />
            <Picker.Item />
          </Picker>
        </Box>
        <Button
          variant="primary"
          title="Agregar"
          onPress={onSubmit}
          isLoading={isLoading}
          marginVertical="s"
        />
        <SemanticButton variant="error" title="Cancelar" onPress={onCancel} />
      </ScrollView>
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
  children: ReactNode;
}

const ButtonGroupContext = createContext<ButtonGroupProps | null>(null);

const ButtonGroup: FC<ButtonGroupProps> = ({ children, value, onChange }) => {
  return (
    <ButtonGroupContext.Provider value={{ value, onChange, children }}>
      {children}
    </ButtonGroupContext.Provider>
  );
};

const useButtonGroup = () => {
  const methods = useContext(ButtonGroupContext);

  return methods as unknown as ButtonGroupProps;
};
