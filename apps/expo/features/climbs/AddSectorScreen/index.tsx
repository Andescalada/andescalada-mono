import sector from "@andescalada/api/schemas/sector";
import { SectorKindSchema } from "@andescalada/db/zod";
import useZodForm from "@andescalada/hooks/useZodForm";
import {
  A,
  Box,
  Button,
  ButtonGroup,
  Ionicons,
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
import conditionalVars from "@utils/conditionalVars";
import { sectorKindAssets } from "@utils/sectorKindAssets";
import type { FC } from "react";
import { useController } from "react-hook-form";
import { Alert } from "react-native";
import { FadeIn, FadeOut } from "react-native-reanimated";

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
    <Screen padding="m" safeAreaDisabled={conditionalVars.disableForAndroid}>
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
        <Text variant="p1R" marginBottom="s">
          Tipo de sector
        </Text>
        <Box flexDirection="row" flexWrap="wrap">
          {SectorKindSchema.options.map((kind) => (
            <ButtonGroup.Item
              key={kind}
              value={kind}
              label={sectorKindAssets[kind].label}
            />
          ))}
        </Box>
        {sectorKind.fieldState?.error?.message && (
          <Text marginTop={"xs"} color="semantic.error">
            {sectorKind.fieldState?.error?.message}
          </Text>
        )}
      </ButtonGroup>
      {sectorKind.field.value && (
        <A.Box
          entering={FadeIn}
          exiting={FadeOut}
          flexDirection="row"
          alignItems="stretch"
        >
          <Ionicons name="information-circle-sharp" size={30} />
          <Box marginHorizontal="xs" flexShrink={1}>
            <Text variant="p2R" marginLeft={"s"} textAlign="justify">
              {sectorKindAssets[sectorKind.field.value].info}
            </Text>
          </Box>
        </A.Box>
      )}
      <Button
        variant="primary"
        title="Agregar"
        onPress={onSubmit}
        isLoading={isLoading}
        marginTop="m"
      />
      <SemanticButton variant="error" title="Cancelar" onPress={onCancel} />
    </Screen>
  );
};

export default AddSectorScreen;
