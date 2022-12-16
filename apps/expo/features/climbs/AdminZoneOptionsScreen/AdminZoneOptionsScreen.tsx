import { ListItemOption, Screen, Text } from "@andescalada/ui";
import {
  ClimbsNavigationRoutes,
  ClimbsNavigationScreenProps,
} from "@features/climbs/Navigation/types";
import usePermissions from "@hooks/usePermissions";
import { FC } from "react";

type Props =
  ClimbsNavigationScreenProps<ClimbsNavigationRoutes.AdminZoneOptions>;

const AdminZoneOptionsScreen: FC<Props> = ({
  navigation,
  route: {
    params: { zoneId, zoneName },
  },
}) => {
  const { permission } = usePermissions({ zoneId });
  return (
    <Screen padding="m" safeAreaDisabled>
      <Text variant="h1" marginBottom="m">
        {zoneName}
      </Text>
      <ListItemOption
        onPress={() =>
          navigation.navigate(ClimbsNavigationRoutes.AddSector, {
            zoneId,
          })
        }
      >
        Agregar sector
      </ListItemOption>
      <ListItemOption
        onPress={() =>
          navigation.navigate(ClimbsNavigationRoutes.ZoneAgreementsEditor, {
            zoneId,
            zoneName,
          })
        }
      >
        Acuerdos
      </ListItemOption>
    </Screen>
  );
};

export default AdminZoneOptionsScreen;
