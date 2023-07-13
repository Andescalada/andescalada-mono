import { Box, Icon, Screen, Text } from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import { ComponentProps, FC } from "react";
import { useWindowDimensions } from "react-native";

interface Props {
  onNext: () => void;
  index: number;
}

const getDayName = (date = new Date(), locale = "es-CL") => {
  return date.toLocaleDateString(locale, { weekday: "long" });
};

const GrayText = (props: ComponentProps<typeof Text>) => (
  <Text color="grayscale.800" {...props} />
);

const CALENDAR_SIZE = 100;

const StepGeneralDetails: FC<Props> = () => {
  const { width: screenWidth } = useWindowDimensions();
  const { data } = trpc.photoContest.getCurrentContest.useQuery();
  const today = new Date();
  const daysLeft = data
    ? (data?.ending?.getTime() - today.getTime()) / (1000 * 3600 * 24)
    : 0;
  if (!data) return null;
  return (
    <Screen
      width={screenWidth}
      padding="m"
      bg="brand.secondaryB"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        height={160}
        width={160}
        borderRadius={160 / 2}
        justifyContent="center"
        alignItems="center"
        backgroundColor="grayscale.500"
      >
        <Icon name="photo-gallery-color" size={150} />
      </Box>
      <GrayText variant="p1R" numberOfLines={3}>
        Queremos conseguir las mejores fotos para{" "}
        <GrayText variant="p1B" numberOfLines={3}>
          La Cuesta las Chilcas y Cachacabuco.
        </GrayText>
      </GrayText>
      <Box flexDirection="row" alignItems="center" marginTop="xxl">
        <Box
          width={CALENDAR_SIZE}
          height={CALENDAR_SIZE + 20}
          bg="contrast.opaque.red"
          borderRadius={8}
          overflow="hidden"
          justifyContent="space-between"
        >
          <Box justifyContent="center" alignItems="center" height={20}>
            <Text>Duración</Text>
          </Box>
          <Box
            height={CALENDAR_SIZE}
            width="100%"
            bg="grayscale.white"
            alignItems="center"
            justifyContent="center"
          >
            <GrayText
              fontSize={CALENDAR_SIZE - 40}
              lineHeight={CALENDAR_SIZE - 40}
            >
              {daysLeft.toFixed(0)}
            </GrayText>
            <GrayText verticalAlign="top">días</GrayText>
          </Box>
        </Box>
        <Box flex={1} padding="m">
          <GrayText variant="p1R">{`El concurso dura ${daysLeft.toFixed(
            0,
          )} días, es decir, termina el ${getDayName(
            data.ending,
          )} ${data.ending?.toLocaleDateString("es-CL")}`}</GrayText>
        </Box>
      </Box>
    </Screen>
  );
};

export default StepGeneralDetails;
