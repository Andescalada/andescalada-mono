import { SectorKindSchema } from "@andescalada/db/zod";
import {
  Box,
  Button,
  Ionicons,
  Modal,
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
import { sectorKindAssets } from "@utils/sectorKindAssets";
import { FC, useState } from "react";
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

const AddWallScreen: FC<Props> = ({ route, navigation }) => {
  const { sectorId, zoneId, sectorKind } = route.params;
  const utils = trpc.useContext();
  const { mutate, isLoading } = trpc.walls.add.useMutation({
    onSuccess: (data, params) => {
      navigation.replace(ClimbsNavigationRoutes.Wall, {
        sectorId: params.sectorId,
        wallId: data.id,
        wallName: data.name,
        zoneId: params.zoneId,
        sectorKind,
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

  const [openModal, setOpenModal] = useState(false);

  return (
    <Screen padding="m">
      <Box
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text variant="h1">{`Agregar ${sectorKindAssets[sectorKind].label}`}</Text>
        <Ionicons
          name="information-circle"
          size={25}
          onPress={() => setOpenModal(true)}
        />
      </Box>
      <Box marginTop={"m"}>
        <Text variant={"p1R"} marginBottom={"s"}>
          {sectorKindAssets[sectorKind].nameOf}
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
      <Modal
        visible={openModal}
        onDismiss={() => setOpenModal(false)}
        margin="s"
        padding="m"
      >
        <Modal.Close />
        <ModalDescription sectorKind={sectorKind} />
      </Modal>
    </Screen>
  );
};

export default AddWallScreen;

const ModalDescription = ({
  sectorKind,
}: {
  sectorKind: typeof SectorKindSchema._type;
}) => {
  if (sectorKind === SectorKindSchema.enum.Boulder) {
    return <BoulderDescription />;
  }
  return <WallDescription />;
};

const WallDescription = () => (
  <Box>
    <Text variant="h4" marginBottom="m">
      Sobre las paredes
    </Text>
    <Text variant="p2R" marginBottom="s">
      Un sector puede estar conformado de muchas paredes o una pared es tan
      grade que conviene dividirla en secciones.
    </Text>
    <Text variant="p2R" marginBottom="s">
      Agrega cuantas paredes quieras y luego podrás agregar las vías.
    </Text>
    <Text variant="p2R" marginBottom="s">
      Considera que una pared quepa en una sola foto, si no es así, considera
      dividirla en secciones.
    </Text>
  </Box>
);

const BoulderDescription = () => (
  <Box>
    <Text variant="h4" marginBottom="m">
      Sobre los bloques (boulders)
    </Text>
    <Text variant="p2R" marginBottom="s">
      Un sector de bloques puede estar conformado de muchos rocones o un único
      rocón es tan grade que conviene dividirlo en caras.
    </Text>
    <Text variant="p2R" marginBottom="s">
      Agrega cuantos bloques quieras y luego podrás agregar las rutas.
    </Text>
    <Text variant="p2R" marginBottom="s">
      Considera que un bloque quepa en una sola foto, si no es así, considera
      dividirlo en caras.
    </Text>
  </Box>
);
