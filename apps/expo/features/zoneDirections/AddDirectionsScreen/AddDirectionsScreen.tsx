import zone from "@andescalada/api/schemas/zone";
import transportationModeAssets from "@andescalada/common-assets/transportationModesAssets";
import { TransportationModeSchema } from "@andescalada/db/zod";
import useZodForm from "@andescalada/hooks/useZodForm";
import {
  A,
  Box,
  Button,
  ButtonGroup,
  KeyboardAvoidingBox,
  KeyboardDismiss,
  Screen,
  ScrollView,
  SemanticButton,
  Text,
  TextInput,
} from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import {
  ZoneDirectionsRoutes,
  ZoneDirectionsScreenProps,
} from "@features/zoneDirections/Navigation/types";
import { FC, useState } from "react";
import { useController } from "react-hook-form";
import { Keyboard } from "react-native";
import { useNotifications } from "react-native-notificated";
import { FadeIn } from "react-native-reanimated";

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
      utils.zones.allSectors.invalidate({ zoneId });
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

  const [showDirectionsOptions, setShowDirectionsOptions] = useState(true);

  return (
    <Screen safeAreaDisabled padding="m">
      <KeyboardAvoidingBox behavior="height">
        <KeyboardDismiss>
          <ScrollView
            onResponderGrant={Keyboard.dismiss}
            contentContainerStyle={{ flex: 1 }}
          >
            {showDirectionsOptions && (
              <A.Box entering={FadeIn}>
                <Text variant="h4">Modo de transporte</Text>
                <ButtonGroup
                  value={transportationMode.field.value}
                  onChange={transportationMode.field.onChange}
                >
                  <Box flexDirection="row" alignItems="stretch" flexWrap="wrap">
                    {TransportationModeSchema.options.map((mode) => (
                      <ButtonGroup.Item
                        margin="s"
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
              </A.Box>
            )}
            <Box
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              marginTop="m"
            >
              <Text variant="h4">Descripción</Text>
              {!showDirectionsOptions && (
                <SemanticButton
                  variant="info"
                  title="Finalizar"
                  titleVariant="p2B"
                />
              )}
            </Box>
            <TextInput
              containerProps={{ flex: 1, padding: "s" }}
              multiline
              textAlignVertical="top"
              value={description.field.value}
              onChangeText={description.field.onChange}
              onBlur={() => {
                description.field.onBlur;
                setShowDirectionsOptions(true);
              }}
              onFocus={() => setShowDirectionsOptions(false)}
            />
            <Text variant="error" color="semantic.error">
              {description.fieldState.error?.message}
            </Text>
            <Button
              variant={isValid ? "info" : "transparent"}
              title="Continuar"
              marginVertical="l"
              isLoading={addDirection.isLoading}
              disabled={addDirection.isLoading || !isValid}
              onPress={onSubmit}
            />
          </ScrollView>
        </KeyboardDismiss>
      </KeyboardAvoidingBox>
    </Screen>
  );
};

export default AddDirectionsScreen;
