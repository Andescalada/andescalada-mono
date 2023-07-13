import { Box, Text } from "@andescalada/ui";
import { ComponentProps, FC } from "react";

interface Props {
  days: string;
  size?: number;
  title?: string;
}

const GrayText = (props: ComponentProps<typeof Text>) => (
  <Text color="grayscale.800" {...props} />
);

const Calendar: FC<Props> = ({ days, size = 100, title = "Duración" }) => {
  return (
    <Box
      width={size}
      height={size + 20}
      bg="contrast.opaque.red"
      borderRadius={8}
      overflow="hidden"
      justifyContent="space-between"
    >
      <Box justifyContent="center" alignItems="center" height={20}>
        <Text>{title}</Text>
      </Box>
      <Box
        height={size}
        width="100%"
        bg="grayscale.white"
        alignItems="center"
        justifyContent="center"
      >
        <GrayText fontSize={size - 40} lineHeight={size - 40}>
          {days}
        </GrayText>
        <GrayText verticalAlign="top">días</GrayText>
      </Box>
    </Box>
  );
};

export default Calendar;
