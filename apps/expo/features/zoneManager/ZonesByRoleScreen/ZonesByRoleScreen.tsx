import { Box, Ionicons, Pressable, Screen, Text } from "@andescalada/ui";
import {
  ZoneManagerRoutes,
  ZoneManagerScreenProps,
} from "@features/zoneManager/Navigation/types";
import { FC } from "react";

type Props = ZoneManagerScreenProps<ZoneManagerRoutes.ZonesByRole>;

const ZonesByRoleScreen: FC<Props> = ({ navigation }) => {
  return (
    <Screen safeAreaDisabled padding="m">
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Text variant="h3">Crear una zona</Text>
        <Pressable
          backgroundColor="semantic.info"
          borderRadius={30}
          padding="xs"
          onPress={() =>
            navigation.navigate(ZoneManagerRoutes.AddNewZoneScreen)
          }
        >
          <Ionicons name={"add-sharp"} size={30} color="grayscale.white" />
        </Pressable>
      </Box>
    </Screen>
  );
};

export default ZonesByRoleScreen;
