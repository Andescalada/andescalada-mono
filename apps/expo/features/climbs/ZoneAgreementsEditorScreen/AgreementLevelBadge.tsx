import { AgreementLevelSchema } from "@andescalada/db/zod";
import { Box, Text } from "@andescalada/ui";
import agreementLevel from "@utils/agreementLevel";
import { FC, useMemo } from "react";

interface Props {
  level: typeof AgreementLevelSchema._type;
}

const AgreementLevelBadge: FC<Props> = ({ level }) => {
  const { backgroundColor, color, label } = useMemo(
    () => agreementLevel(level),
    [level],
  );
  return (
    <Box
      backgroundColor={backgroundColor}
      justifyContent="center"
      position="absolute"
      paddingHorizontal="s"
      height={30}
      bottom={-15}
      right={16}
      borderRadius={15}
      borderWidth={3}
      borderColor="background"
    >
      <Text color={color}>{label}</Text>
    </Box>
  );
};

export default AgreementLevelBadge;
