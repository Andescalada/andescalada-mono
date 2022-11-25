import {
  AnimatedBackground,
  Box,
  Button,
  Screen,
  Text,
  TextInput,
} from "@andescalada/ui";
import {
  AuthNavigationRoutes,
  AuthNavigationScreenProps,
} from "@features/auth/Navigation/types";
import useZodForm from "@hooks/useZodForm";
import passwordless from "@utils/auth0/passwordless";
import { FC, useMemo } from "react";
import { useController } from "react-hook-form";
import { z } from "zod";

type Props = AuthNavigationScreenProps<AuthNavigationRoutes.EnterEmail>;

const schema = z.object({
  email: z
    .string({ required_error: "Requerido" })
    .email({ message: "Email inválido" }),
});

const EnterEmailScreen: FC<Props> = ({ navigation }) => {
  const form = useZodForm({
    schema,
    criteriaMode: "firstError",
    reValidateMode: "onChange",
  });
  const {
    field: { onBlur, onChange, value, ref },
    fieldState: { error },
  } = useController({
    name: "email",
    control: form.control,
  });

  const onNext = form.handleSubmit(async (data) => {
    await passwordless.login(data.email);

    navigation.navigate(AuthNavigationRoutes.EnterCode, { email: data.email });
  });

  return (
    <Screen
      padding="m"
      backgroundColor="brand.primaryA"
      justifyContent="space-evenly"
      alignItems="center"
    >
      <AnimatedBackground />
      <Box flex={0.25} justifyContent="space-between">
        <Text variant="h1">Ingresa tu correo electrónico</Text>
        <Box>
          <TextInput
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            ref={ref}
            placeholder="Correo electrónico"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            autoFocus
            onSubmitEditing={onNext}
            containerProps={{ height: 40, paddingLeft: "s" }}
          />
          {error ? (
            <Text variant="error">{error.message}</Text>
          ) : (
            <Text variant="error" />
          )}
        </Box>
      </Box>
      <Button
        title="Siguiente"
        onPress={onNext}
        variant="transparent"
        paddingHorizontal="l"
        titleProps={{ color: "grayscale.white" }}
      />
    </Screen>
  );
};

export default EnterEmailScreen;
