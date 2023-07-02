import useZodForm from "@andescalada/hooks/useZodForm";
import {
  AnimatedBackground,
  Box,
  Screen,
  Text,
  TextInput,
} from "@andescalada/ui";
import {
  AuthNavigationRoutes,
  AuthNavigationScreenProps,
} from "@features/auth/Navigation/types";
import passwordless from "@utils/auth0/passwordless";
import { FC } from "react";
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

    navigation.navigate(AuthNavigationRoutes.EnterCode, {
      connectionStrategy: "email",
      email: data.email,
    });
  });

  return (
    <Screen
      justifyContent="flex-start"
      alignItems="center"
      padding="m"
      paddingTop="xxxl"
    >
      <AnimatedBackground />
      <Box flex={0.25} justifyContent="space-between">
        <Box>
          <Text variant="h1">Ingresa tu correo electrónico</Text>
          <Text variant="p2R" marginTop="xs">
            para recibir un código de verificación
          </Text>
        </Box>
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
    </Screen>
  );
};

export default EnterEmailScreen;
