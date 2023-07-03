import {
  Box,
  Button,
  Icon,
  Ionicons,
  Pressable,
  Screen,
  Text,
} from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import {
  OnboardingRoutes,
  OnboardingScreenProps,
} from "@features/onboarding/Navigation/types";
import * as Linking from "expo-linking";
import { FC, useState } from "react";
import { useNotifications } from "react-native-notificated";

type Props = OnboardingScreenProps<OnboardingRoutes.TermsAndConditions>;

const TermsAndConditionsScreen: FC<Props> = ({ navigation }) => {
  const [acceptTerms, setAcceptTerms] = useState(false);
  const acceptTermsAndConditions =
    trpc.user.acceptTermsAndConditions.useMutation();

  const { notify } = useNotifications();
  return (
    <Screen padding="l" justifyContent="space-between">
      <Box flex={1} justifyContent="center" alignItems="center" gap="m">
        <Text fontSize={50} lineHeight={50}>
          Atención
        </Text>
        <Icon name="danger-color" size={150} />
        <Text variant="p1R">¡Escalar es una actividad de riesgo!</Text>
        <Box bg="backgroundContrast" padding="s" borderRadius={4}>
          <Text variant="p3R" color="background">
            Pueden haber errores o información parcial sobre las rutas de
            escalada. Es tu deber verificar la información y cuidar por tu
            seguridad personal.
          </Text>
        </Box>
      </Box>
      <Box>
        <Box flexDirection="row" alignItems="center">
          <Ionicons
            name={acceptTerms ? "checkbox" : "stop-outline"}
            size={30}
            onPress={() => setAcceptTerms((prev) => !prev)}
          />
          <Pressable
            marginLeft="s"
            onPress={() => {
              Linking.openURL(
                "https://www.andescalada.org/terminos-y-condiciones",
              );
            }}
          >
            <Text variant="p2R" textDecorationLine="underline">
              Acepto los Términos y condiciones.{" "}
              <Text
                variant="p2R"
                textDecorationLine="underline"
                color="semantic.info"
              >
                Ver
              </Text>
            </Text>
          </Pressable>
        </Box>
        <Button
          marginVertical="m"
          title="Continuar"
          onPress={() => {
            if (!acceptTerms) {
              notify("error", {
                params: {
                  title: "Error",
                  description:
                    "Debes aceptar los términos y condiciones para continuar",
                },
              });
              return;
            }
            acceptTermsAndConditions.mutate();
            navigation.navigate(OnboardingRoutes.Permissions);
          }}
          variant={acceptTerms ? "info" : "transparent"}
        />
      </Box>
    </Screen>
  );
};

export default TermsAndConditionsScreen;
