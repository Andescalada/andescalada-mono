import useZodForm from "@andescalada/hooks/useZodForm";
import {
  AnimatedBackground,
  Box,
  KeyboardDismiss,
  PhoneInput,
  PhoneInputRef,
  Pressable,
  Screen,
  Text,
} from "@andescalada/ui";
import {
  AuthNavigationRoutes,
  AuthNavigationScreenProps,
} from "@features/auth/Navigation/types";
import passwordless from "@utils/auth0/passwordless";
import client from "@utils/trpc/client";
import { FC, useRef } from "react";
import { useController } from "react-hook-form";
import { useWindowDimensions } from "react-native";
import { z } from "zod";

import { isAndroid } from "../../../utils/platform";

const createUser = client.public.createUser.mutate;

const addPhoneNumber = client.user.addPhoneNumber.mutate;

type Props = AuthNavigationScreenProps<AuthNavigationRoutes.EnterPhoneNumber>;

const schema = z.object({
  phoneNumber: z.string({ required_error: "Requerido" }),
});

const EnterPhoneNumber: FC<Props> = ({ navigation, route: { params } }) => {
  const form = useZodForm({
    schema,
    criteriaMode: "firstError",
    reValidateMode: "onChange",
  });
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    name: "phoneNumber",
    control: form.control,
  });

  const phoneInputRef = useRef<PhoneInputRef>(null);

  const SHOW_I_HAVE_AN_EMAIL_ACCOUNT = false;

  const onNext = form.handleSubmit(async (data) => {
    const countryCode = phoneInputRef.current?.getCallingCode();
    const country = phoneInputRef.current?.getCountryCode();

    if (!countryCode) {
      throw new Error("Cannot get country code");
    }

    const fullNumber = `+${countryCode}${data.phoneNumber}`;

    passwordless.login(fullNumber, "sms");
    if (params?.userId) {
      addPhoneNumber({
        userId: params.userId,
        fullNumber,
        countryCode,
        country,
        phoneNumber: data.phoneNumber,
      });
    } else {
      createUser({
        identifier: "phoneNumber",
        fullNumber,
        countryCode,
        country,
        phoneNumber: data.phoneNumber,
      });
    }
    navigation.push(AuthNavigationRoutes.EnterCode, {
      connectionStrategy: "sms",
      phoneNumber: fullNumber,
    });
    form.reset();
  });

  const windowHeight = useWindowDimensions().height;

  return (
    <Screen safeAreaDisabled minHeight={isAndroid ? windowHeight : undefined}>
      <AnimatedBackground />
      <KeyboardDismiss
        justifyContent="flex-start"
        alignItems="center"
        padding="m"
        paddingTop="xxxl"
      >
        <Box justifyContent="space-between">
          <Box marginBottom="m">
            <Text variant="h1">Ingresa tu número de teléfono</Text>
          </Box>
          <Box>
            <PhoneInput
              ref={phoneInputRef}
              placeholder="982049506"
              value={value}
              onChangeText={(e) => onChange(e)}
              onSubmit={onNext}
              autoFocus
            />
            {error ? (
              <Text variant="error">{error.message}</Text>
            ) : (
              <Text variant="error" />
            )}
          </Box>
        </Box>
        {SHOW_I_HAVE_AN_EMAIL_ACCOUNT && (
          <Pressable
            alignSelf="center"
            marginTop="xl"
            padding="s"
            onPress={() => navigation.navigate(AuthNavigationRoutes.EnterEmail)}
          >
            <Text textDecorationLine="underline" variant="p3R">
              Tengo una cuenta con mi correo electrónico
            </Text>
          </Pressable>
        )}
      </KeyboardDismiss>
    </Screen>
  );
};

export default EnterPhoneNumber;
