import { Box, Screen, SemanticButton, Text, TextButton } from "@andescalada/ui";
import {
  ZoneDirectionsRoutes,
  ZoneDirectionsScreenProps,
} from "@features/zoneDirections/Navigation/types";
import usePermissions from "@hooks/usePermissions";
import { FC } from "react";
import { FlatList } from "react-native";

type Props = ZoneDirectionsScreenProps<ZoneDirectionsRoutes.ZoneDirections>;

const ZoneDirectionsScreen: FC<Props> = ({
  navigation,
  route: {
    params: { zoneId, zoneName },
  },
}) => {
  const { permission } = usePermissions({ zoneId });
  return (
    <Screen safeAreaDisabled padding="m">
      <FlatList
        data={[]}
        renderItem={() => <Box />}
        ListEmptyComponent={() => (
          <Box marginTop="xxxl" alignItems="center">
            <Text variant="p1R">Sin direcciones</Text>
            {permission.has("Create") && (
              <TextButton
                variant="info"
                onPress={() =>
                  navigation.navigate(ZoneDirectionsRoutes.AddDirections, {
                    zoneId,
                    zoneName,
                  })
                }
              >
                Agregar direcciones
              </TextButton>
            )}
          </Box>
        )}
      />
    </Screen>
  );
};

export default ZoneDirectionsScreen;
