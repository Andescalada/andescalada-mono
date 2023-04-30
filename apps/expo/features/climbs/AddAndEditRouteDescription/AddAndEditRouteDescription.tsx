import route, { descriptionLength } from "@andescalada/api/schemas/route";
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
import { FC, RefObject, useRef } from "react";
import { useController } from "react-hook-form";

type Props =
  ClimbsNavigationScreenProps<ClimbsNavigationRoutes.AddAndEditRouteDescription>;

const AddAndEditZoneDescription: FC<Props> = ({
  navigation,
  route: {
    params: { zoneId, description: defaultDescription, routeId },
  },
}) => {
  const textRef = useRef<TextInputRef>() as RefObject<TextInputRef>;
  const form = useZodForm({ schema: route.description });
  const description = useController({
    name: "description",
    control: form.control,
    defaultValue: defaultDescription || "",
  });
  const utils = trpc.useContext();
  const upsertDescription = trpc.routes.upsertDescription.useMutation({
    onMutate: ({ description }) => {
      if (!description) return;
      utils.routes.byIdWithEvaluation.cancel({ routeId, zoneId });
      const previousData = utils.routes.byIdWithEvaluation.getData();
      utils.routes.byIdWithEvaluation.setData({ routeId, zoneId }, (old) => {
        if (!old) return old;
        return {
          ...old,
          description,
        };
      });

      return { previousData };
    },
    onError: (_, variables, context) => {
      utils.routes.byIdWithEvaluation.setData(variables, context?.previousData);
    },
    onSettled: () => {
      utils.routes.byIdWithEvaluation.invalidate({ routeId, zoneId });
    },
  });

  const onSubmit = form.handleSubmit(({ description }) => {
    navigation.goBack();
    upsertDescription.mutate({ zoneId, description, routeId });
  });

  const notValidLength = (value: string) => {
    const length = value.length;
    const tooShort = length < descriptionLength.min;
    const tooLong = length > descriptionLength.max;
    return tooShort || tooLong;
  };

  return (
    <Screen safeAreaDisabled padding="m">
      <KeyboardAvoidingBox behavior="height">
        <KeyboardDismiss>
          <Text variant="h4" marginBottom="s">
            Agrega una descripción
          </Text>
          <TextInput
            multiline
            placeholder={`Escribe una descripción de la zona, mínimo ${descriptionLength.min} caracteres.`}
            textAlignVertical="top"
            ref={textRef}
            containerProps={{ flex: 1, padding: "s" }}
            value={description.field.value}
            onChangeText={description.field.onChange}
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
