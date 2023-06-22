import sector from "@andescalada/api/schemas/sector";
import { SectorKindSchema } from "@andescalada/db/zod";
import useZodForm from "@andescalada/hooks/useZodForm";
import {
  A,
  Box,
  Button,
  ButtonGroup,
  Ionicons,
  KeyboardDismiss,
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
import { ZoneManagerRoutes } from "@features/zoneManager/Navigation/types";
import useRootNavigation from "@hooks/useRootNavigation";
import { RootNavigationRoutes } from "@navigation/AppNavigation/RootNavigation/types";
import conditionalVars from "@utils/conditionalVars";
import { sectorKindAssets } from "@utils/sectorKindAssets";
import { FC, useMemo } from "react";
import { useController } from "react-hook-form";
import { Alert } from "react-native";
import { FadeIn, FadeOut } from "react-native-reanimated";

type Props = ClimbsNavigationScreenProps<ClimbsNavigationRoutes.AddSector>;

const { schema } = sector;

const AddSectorScreen: FC<Props> = ({
  route: {
    params: { zoneId, sectorId, ...defaultValues },
  },
  navigation,
}) => {
  const text = useMemo(() => {
    if (!sectorId) return { title: "Agregar sector", button: "Agregar" };
    return { title: "Editar sector", button: "Editar" };
  }, [sectorId]);

  const utils = trpc.useContext();

  const rootNavigation = useRootNavigation();

  const { mutate, isLoading } = trpc.sectors.add.useMutation({
    onSuccess: (data, params) => {
      if (sectorId) utils.sectors.allWalls.invalidate({ sectorId });
      utils.zones.allSectors.invalidate({ zoneId });
      rootNavigation.replace(RootNavigationRoutes.ZoneManager, {
        screen: ZoneManagerRoutes.AddOrEditSectorLocation,
        params: {
          sectorId: data.id,
          sectorName: data.name,
          zoneId: params.zoneId,
        },
      });
    },
  });

  const { handleSubmit, control } = useZodForm({
    schema,
    defaultValues,
  });

  const {
    field: { onChange, value },
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
    mutate({
      zoneId,
      name: input.name,
      sectorKind: input.sectorKind,
      sectorId,
    });
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
      <KeyboardDismiss>
        <Text variant="h1">{text.title}</Text>
        <Box marginTop="m">
          <Text variant="p1R" marginBottom="s">
            Nombre del sector
          </Text>
          <TextInput
            value={value}
            onChangeText={onChange}
            containerProps={{ height: 40 }}
          />
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
          title={text.button}
          onPress={onSubmit}
          isLoading={isLoading}
          marginTop="m"
        />
        <SemanticButton variant="error" title="Cancelar" onPress={onCancel} />
      </KeyboardDismiss>
    </Screen>
  );
};

export default AddSectorScreen;
