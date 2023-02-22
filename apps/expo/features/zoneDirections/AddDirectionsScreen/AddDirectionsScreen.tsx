import zone from "@andescalada/api/schemas/zone";
import { TransportationModeSchema } from "@andescalada/db/zod";
import useZodForm from "@andescalada/hooks/useZodForm";
import {
  Box,
  Button,
  ButtonGroup,
  KeyboardAvoidingBox,
  KeyboardDismiss,
  Screen,
  Text,
  TextInput,
} from "@andescalada/ui";
import transportationModeAssets from "@andescalada/utils/transportationModesAssets";
import { trpc } from "@andescalada/utils/trpc";
import {
  ZoneDirectionsRoutes,
  ZoneDirectionsScreenProps,
} from "@features/zoneDirections/Navigation/types";
import { FC } from "react";
import { useController } from "react-hook-form";
import { useNotifications } from "react-native-notificated";

type Props = ZoneDirectionsScreenProps<ZoneDirectionsRoutes.AddDirections>;

const AddDirectionsScreen: FC<Props> = ({
  navigation,
  route: {
    params: {
      zoneId,
      description: defaultDescription,
      transportationMode: defaultTransportationMode,
    },
  },
}) => {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useZodForm({
    schema: zone.addDirections,
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const transportationMode = useController({
    control,
    name: "transportationMode",
    defaultValue: defaultTransportationMode,
  });
  const description = useController({
    control,
    name: "description",
    defaultValue: defaultDescription,
  });
  const { notify } = useNotifications();
  const utils = trpc.useContext();
  const addDirection = trpc.zones.addDirection.useMutation({
    onSuccess: () => {
      utils.zones.directionsById.invalidate({ zoneId });
      navigation.goBack();
    },
    onError: (error) => {
      let description = "No pudimos guardar los datos que agregaste 😢";
      if (
        error instanceof Error &&
        error.message.includes("Unique constraint failed")
      ) {
        description = "Ya existe una descripción para ese modo de transporte";
      }
      notify("error", { params: { title: "Error", description } });
    },
  });

  const onSubmit = handleSubmit((data) => {
    addDirection.mutate({ ...data, zoneId });
  });

  return (
    <Screen safeAreaDisabled padding="m">
      <KeyboardAvoidingBox>
        <KeyboardDismiss>
          <Text variant="h4">Modo de transporte</Text>
          <ButtonGroup
            value={transportationMode.field.value}
            onChange={transportationMode.field.onChange}
          >
            <Box flexDirection="row" alignItems="stretch" flexWrap="wrap">
              {TransportationModeSchema.options.map((mode) => (
                <ButtonGroup.Item
                  key={mode}
                  label={transportationModeAssets[mode].label}
                  value={mode}
                />
              ))}
            </Box>
            <Text variant="error" color="semantic.error">
              {transportationMode.fieldState.error?.message}
            </Text>
          </ButtonGroup>
          <Text variant="h4" marginTop="m">
            Descripción
          </Text>
          <TextInput
            containerProps={{ flex: 1, padding: "s" }}
            multiline
            textAlignVertical="top"
            value={description.field.value}
            onChangeText={description.field.onChange}
            onBlur={description.field.onBlur}
          />
          <Text variant="error" color="semantic.error">
            {description.fieldState.error?.message}
          </Text>
        </KeyboardDismiss>
      </KeyboardAvoidingBox>
      <Button
        variant={isValid ? "info" : "transparent"}
        title="Continuar"
        marginVertical="l"
        isLoading={addDirection.isLoading}
        disabled={addDirection.isLoading || !isValid}
        onPress={onSubmit}
      />
    </Screen>
  );
};

export default AddDirectionsScreen;
