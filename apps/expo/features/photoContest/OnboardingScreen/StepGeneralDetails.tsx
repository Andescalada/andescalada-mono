import { Box, Screen, Text } from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import { FC } from "react";
import { useWindowDimensions } from "react-native";

interface Props {
  onNext: () => void;
  index: number;
}

function getDayName(date = new Date(), locale = "es-CL") {
  return date.toLocaleDateString(locale, { weekday: "long" });
}

const StepGeneralDetails: FC<Props> = (props) => {
  const { width: screenWidth } = useWindowDimensions();
  const { data } = trpc.photoContest.getCurrentContest.useQuery();
  const today = new Date();
  const daysLeft = data
    ? (data?.ending?.getTime() - today.getTime()) / (1000 * 3600 * 24)
    : 0;
  if (!data) return null;
  return (
    <Screen width={screenWidth}>
      <Box
        flex={1}
        justifyContent="space-evenly"
        alignItems="flex-start"
        padding="l"
      >
        <Text variant="p1R" numberOfLines={3}>
          Estamos buscando fotos de las zonas
        </Text>
        <Text variant="p1R" numberOfLines={3}>
          La Cuesta las Chilcas y Cachacabuco
        </Text>
        <Text>{`El concurso dura ${daysLeft.toFixed(
          0,
        )} días, es decir, termina el ${getDayName(
          data.ending,
        )} ${data.ending?.toLocaleDateString("es-CL")}`}</Text>
      </Box>
    </Screen>
  );
};

export default StepGeneralDetails;
