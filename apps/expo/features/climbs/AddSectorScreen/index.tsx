import sector from "@andescalada/api/schemas/sector";
import { SectorKindSchema } from "@andescalada/db/zod";
import {
  Box,
  Button,
  ButtonGroup,
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
import type { FC } from "react";
import { useController } from "react-hook-form";
import { Alert } from "react-native";

type Props = ClimbsNavigationScreenProps<ClimbsNavigationRoutes.AddSector>;

const { schema } = sector;

const AddSectorScreen: FC<Props> = ({ route, navigation }) => {
  const { zoneId } = route.params;
  const utils = trpc.useContext();
  const { mutate, isLoading } = trpc.sectors.add.useMutation({
    onSuccess: (data, params) => {
      navigation.replace(ClimbsNavigationRoutes.Sector, {
        sectorId: data.id,
        sectorName: data.name,
        zoneId: params.zoneId,
      });
      utils.zones.allSectors.invalidate({ zoneId });
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
    name: "name",
  });

  const sectorKind = useController({
    control,
    name: "sectorKind",
  });

  const onSubmit = handleSubmit((input) => {
    mutate({ zoneId, name: input.name, sectorKind: input.sectorKind });
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
      <Text variant="h1">Agregar sector</Text>
      <Box marginTop="m">
        <Text variant="p1R" marginBottom="s">
          Nombre del sector
        </Text>
        <TextInput onChangeText={onChange} containerProps={{ height: 40 }} />
        <Text marginTop="xs" color="semantic.error">
          {error?.message}
        </Text>
      </Box>
      <ButtonGroup
        value={sectorKind.field.value}
        onChange={sectorKind.field.onChange}
      >
        <Box flexDirection="row">
          {SectorKindSchema.options.map((kind) => (
            <ButtonGroup.Item
              key={kind}
              value={kind}
              label={sectorKindAssets[kind].label}
            />
          ))}
        </Box>
        <Text marginTop={"xs"} color="semantic.error">
          {sectorKind.fieldState?.error?.message}
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

export default AddSectorScreen;
