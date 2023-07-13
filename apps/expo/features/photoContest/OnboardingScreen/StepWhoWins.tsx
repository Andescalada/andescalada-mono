import { Box, Button, Screen, Text } from "@andescalada/ui";
import { showPhotoContestOnboardingAtom } from "@atoms/index";
import {
  PhotoContestNavigationProps,
  PhotoContestRoutes,
} from "@features/photoContest/Navigation/types";
import { useNavigation } from "@react-navigation/native";
import { useAtom } from "jotai";
import { FC } from "react";
import { Linking, useWindowDimensions } from "react-native";

interface Props {
  onNext: () => void;
  index: number;
}

const StepWhoWins: FC<Props> = () => {
  const navigation =
    useNavigation<PhotoContestNavigationProps<PhotoContestRoutes.Onboarding>>();
  const setShowContestOnboarding = useAtom(showPhotoContestOnboardingAtom)[1];
  const { width: screenWidth } = useWindowDimensions();
  return (
    <Screen width={screenWidth}>
      <Box flex={1} gap="l" alignItems="flex-start" padding="l">
        <Text variant="h1" numberOfLines={3}>
          ¿Quienes ganan?
        </Text>
        <Text variant="p1R" numberOfLines={3}>
          Vamos a elegir una foto por cada pared según los criterios que
          mencionamos,
        </Text>
        <Text variant="p1R" numberOfLines={3}>
          🥇 El usuario con más fotos seleccionadas gana el primer lugar
        </Text>
        <Text variant="p1R" numberOfLines={3}>
          🥈🥉 También premiaremos al segundo y tercer lugar.
        </Text>

        <Text variant="p1R" numberOfLines={5}>
          🎲 Compartiendo la foto de la pared en Instagram y etiquetando a
          @andescalada, también estarás participando en el gran sorteo.
        </Text>
        <Button
          title="Continuar"
          variant="info"
          alignSelf="center"
          marginTop="l"
          onPress={() => {
            setShowContestOnboarding(false);
            navigation.replace(PhotoContestRoutes.ZonesList);
          }}
        />
        <Text
          textDecorationLine="underline"
          onPress={() => {
            Linking.openURL(
              "https://www.andescalada.org/bases-1-concurso-documentacion",
            );
          }}
        >
          Puedes revisar más detalles de las bases aquí
        </Text>
      </Box>
    </Screen>
  );
};

export default StepWhoWins;
