import zone, { descriptionLength } from "@andescalada/api/schemas/zone";
import useZodForm from "@andescalada/hooks/useZodForm";
import {
  Box,
  Button,
  KeyboardAvoidingBox,
  KeyboardDismiss,
  Screen,
  Text,
  TextInput,
} from "@andescalada/ui";
import { TextInputRef } from "@andescalada/ui/TextInput/TextInput";
import { trpc } from "@andescalada/utils/trpc";
import {
  ClimbsNavigationRoutes,
  ClimbsNavigationScreenProps,
} from "@features/climbs/Navigation/types";
import { FC, RefObject, useRef, useState } from "react";
import { useController } from "react-hook-form";

type Props =
  ClimbsNavigationScreenProps<ClimbsNavigationRoutes.AddAndEditZoneDescription>;

const AddAndEditZoneDescription: FC<Props> = ({
  navigation,
  route: {
    params: { zoneId, description: defaultDescription },
  },
}) => {
  const textRef = useRef<TextInputRef>() as RefObject<TextInputRef>;
  const form = useZodForm({ schema: zone.description });
  const description = useController({
    name: "description",
    control: form.control,
    defaultValue: defaultDescription || "",
  });
  const utils = trpc.useContext();
  const upsertDescription = trpc.zones.upsertDescription.useMutation({
    onSuccess: () => {
      utils.zones.allSectors.invalidate({ zoneId });
      navigation.goBack();
    },
  });

  const onSubmit = form.handleSubmit(({ description }) => {
    upsertDescription.mutate({ zoneId, description });
  });

  const notValidLength = (value: string) => {
    const length = value.length;
    const tooShort = length < descriptionLength.min;
    const tooLong = length > descriptionLength.max;
    return tooShort || tooLong;
  };

  const [isFocus, setIsFocus] = useState(false);

  return (
    <Screen safeAreaDisabled padding="m">
      <KeyboardAvoidingBox behavior="height">
        <KeyboardDismiss>
          <Box
            flexDirection="row"
            justifyContent="space-between"
            marginBottom="s"
            alignItems="flex-end"
          >
            <>
              <Text variant="h4">Agrega una descripción</Text>
              {isFocus && (
                <Box bg="semantic.info" borderRadius={16} paddingHorizontal="s">
                  <Text variant="p3R">Ok</Text>
                </Box>
              )}
            </>
          </Box>
          <TextInput
            multiline
            placeholder={`Escribe una descripción de la zona, mínimo ${descriptionLength.min} caracteres.`}
            textAlignVertical="top"
            ref={textRef}
            containerProps={{ flex: 1, padding: "s" }}
            value={description.field.value}
            onChangeText={description.field.onChange}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
          />
          <Box marginTop="s" flexDirection="row">
            <Box>
              {description.fieldState.error && (
                <Text color="semantic.error">
                  {description.fieldState.error.message}
                </Text>
              )}
            </Box>
            <Box flexGrow={1} alignItems="flex-end">
              <Text
                color={
                  notValidLength(description.field.value || "")
                    ? "semantic.error"
                    : "text"
                }
              >
                {`${description.field.value?.length || 0}/${
                  descriptionLength.max
                }`}
              </Text>
            </Box>
          </Box>
          <Button
            variant={form.formState.isValid ? "info" : "transparent"}
            title="Continuar"
            marginVertical="l"
            isLoading={upsertDescription.isLoading}
            disabled={upsertDescription.isLoading || !form.formState.isValid}
            onPress={onSubmit}
          />
        </KeyboardDismiss>
      </KeyboardAvoidingBox>
    </Screen>
  );
};

export default AddAndEditZoneDescription;
