import { Box } from "@andescalada/ui";
import { stepsCount } from "@features/photoContest/OnboardingScreen/Steps";
import { useAppTheme } from "@hooks/useAppTheme";
import { FC } from "react";

interface Props {
  currentIndex: number;
}

const indicators = Array.from({ length: stepsCount }, (_, i) => i);

const PageIndicator: FC<Props> = ({ currentIndex }) => {
  const theme = useAppTheme();
  return (
    <Box
      flexDirection="row"
      gap="s"
      position="absolute"
      bottom="10%"
      left="50%"
      style={{
        transform: [
          {
            translateX:
              (-10 * stepsCount - theme.spacing.s * (stepsCount - 1)) / 2,
          },
        ],
      }}
    >
      {indicators.map((item) => (
        <Box
          key={item}
          height={10}
          width={10}
          borderRadius={5}
          bg={currentIndex === item ? "primary" : "grayscale.400"}
        />
      ))}
    </Box>
  );
};

export default PageIndicator;
