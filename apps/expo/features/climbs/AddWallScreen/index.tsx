import {
  Box,
  Button,
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
import useZodForm from "@hooks/useZodForm";
import { FC } from "react";
import { useController } from "react-hook-form";
import { Alert } from "react-native";
import { z } from "zod";

type Props = ClimbsNavigationScreenProps<ClimbsNavigationRoutes.AddWall>;

const schema = z.object({
  wallName: z
    .string({ required_error: "Requerido" })
    .min(3, "Nombre muy corto")
    .max(50, "Nombre muy largo"),
});

const AddSectorScreen: FC<Props> = ({ route, navigation }) => {
  const { sectorId, zoneId } = route.params;
  const utils = trpc.useContext();
  const { mutate, isLoading } = trpc.walls.add.useMutation({
    onSuccess: (data, params) => {
      navigation.replace(ClimbsNavigationRoutes.Wall, {
        sectorId: params.sectorId,
        wallId: data.id,
        wallName: data.name,
        zoneId: params.zoneId,
      });
      utils.sectors.allWalls.invalidate();
    },
  });

  const { handleSubmit, control } = useZodForm({
    schema,
  });

  const {
    field: { onChange },
    fieldState: { error, isDirty },
  } = useController({
    control,
    name: "wallName",
  });

  const onSubmit = handleSubmit((input) => {
    mutate({ zoneId, sectorId, name: input.wallName });
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
      <Text variant="h1">Agregar pared</Text>
      <Box marginTop={"m"}>
        <Text variant={"p1R"} marginBottom={"s"}>
          Nombre de la pared
        </Text>
        <TextInput onChangeText={onChange} containerProps={{ height: 40 }} />
        <Text marginTop={"xs"} color="semantic.error">
          {error?.message}
        </Text>
      </Box>
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

export default AddSectorScreen;
