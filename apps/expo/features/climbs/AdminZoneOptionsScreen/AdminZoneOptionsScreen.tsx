import { ListItemOption, Screen, Text } from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import {
  ClimbsNavigationRoutes,
  ClimbsNavigationScreenProps,
} from "@features/climbs/Navigation/types";
import { ZoneManagerRoutes } from "@features/zoneManager/Navigation/types";
import usePermissions from "@hooks/usePermissions";
import useRootNavigation from "@hooks/useRootNavigation";
import { RootNavigationRoutes } from "@navigation/AppNavigation/RootNavigation/types";
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
  const utils = trpc.useContext();
  const data = utils.zones.allSectors.getData({ zoneId });
  const rootNavigation = useRootNavigation();
  return (
    <Screen padding="m" safeAreaDisabled>
      <Text variant="h1" marginBottom="m">
        {zoneName}
      </Text>
      {permission?.has("EditZoneInfo") && (
        <ListItemOption
          icon="information-circle"
          onPress={() =>
            rootNavigation.navigate(RootNavigationRoutes.ZoneManager, {
              screen: ZoneManagerRoutes.EditZone,
              params: {
                zoneId,
                zoneName,
                infoAccess: data?.infoAccess,
                searchVisibility: data?.searchVisibility,
              },
            })
          }
        >
          Editar información
        </ListItemOption>
      )}
      {permission?.has("EditZoneInfo") && (
        <ListItemOption
          icon="image-outline"
          onPress={() =>
            rootNavigation.navigate(RootNavigationRoutes.Climbs, {
              screen: ClimbsNavigationRoutes.ManageZoneCoverPhotoScreen,
              params: {
                zoneId,
              },
            })
          }
        >
          Foto de portada
        </ListItemOption>
      )}
      {permission?.has("Create") && (
        <ListItemOption
          icon="add-circle"
          onPress={() =>
            navigation.replace(ClimbsNavigationRoutes.AddSector, {
              zoneId,
            })
          }
        >
          Agregar sector
        </ListItemOption>
      )}
      {permission?.has("EditZoneAgreements") && (
        <ListItemOption
          icon="document-text-outline"
          onPress={() =>
            navigation.navigate(ClimbsNavigationRoutes.ZoneAgreementsEditor, {
              zoneId,
              zoneName,
            })
          }
        >
          Editar acuerdos
        </ListItemOption>
      )}
      {permission?.has("Update") && data?.description?.originalText && (
        <ListItemOption
          icon="create-outline"
          onPress={() =>
            navigation.navigate(
              ClimbsNavigationRoutes.AddAndEditZoneDescription,
              {
                zoneId,
                zoneName,
                description: data.description?.originalText,
              },
            )
          }
        >
          Editar descripción
        </ListItemOption>
      )}
      {permission?.has("EditZoneInfo") && data?.Location && (
        <ListItemOption
          icon="location-outline"
          onPress={() =>
            rootNavigation.navigate(RootNavigationRoutes.ZoneManager, {
              screen: ZoneManagerRoutes.EditZoneLocation,
              params: {
                zoneId,
                zoneName,
                latitude: data.Location?.latitude,
                longitude: data.Location?.longitude,
              },
            })
          }
        >
          Editar ubicación
        </ListItemOption>
      )}
    </Screen>
  );
};

export default AdminZoneOptionsScreen;
