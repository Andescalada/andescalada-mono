import { A, Box, Ionicons, Pressable, Text } from "@andescalada/ui";
import infoAccessAssets from "@andescalada/utils/infoAccessAssets";
import { trpc } from "@andescalada/utils/trpc";
import {
  ClimbsNavigationNavigationProps,
  ClimbsNavigationRouteProps,
  ClimbsNavigationRoutes,
} from "@features/climbs/Navigation/types";
import StoryButton from "@features/climbs/ZoneScreen/StoryButton";
import ToolBar from "@features/climbs/ZoneScreen/ToolBar";
import useDownloadedButton from "@features/climbs/ZoneScreen/useDownloadedButton";
import useFavoritedButton from "@features/climbs/ZoneScreen/useFavoritedButton";
import { InfoAccessManagerRoutes } from "@features/InfoAccessManager/Navigation/types";
import { ZoneDirectionsRoutes } from "@features/zoneDirections/Navigation/types";
import { ZoneLocationRoutes } from "@features/zoneLocation/Navigation/types";
import { ZoneManagerRoutes } from "@features/zoneManager/Navigation/types";
import useGlobalPermissions from "@hooks/useGlobalPermissions";
import usePermissions from "@hooks/usePermissions";
import useRootNavigation from "@hooks/useRootNavigation";
import { RootNavigationRoutes } from "@navigation/AppNavigation/RootNavigation/types";
import { useNavigation, useRoute } from "@react-navigation/native";
import UserProfileImage from "@templates/UserProfileImage/UserProfileImage";
import { GlobalPermissions } from "@utils/auth0/types";
import featureFlags from "@utils/featureFlags";
import zoneStatus from "@utils/zoneStatus";
import { useMemo } from "react";
import { FadeIn, FadeOut } from "react-native-reanimated";

const ZoneHeader = () => {
  const {
    params: { zoneId, zoneName },
  } = useRoute<ClimbsNavigationRouteProps<ClimbsNavigationRoutes.Zone>>();

  const navigation =
    useNavigation<
      ClimbsNavigationNavigationProps<ClimbsNavigationRoutes.Zone>
    >();

  const rootNavigation = useRootNavigation();

  const { data } = trpc.zones.allSectors.useQuery({ zoneId });

  const members = useMemo(
    () =>
      data?.RoleByZone.filter((role) => role.Role.name !== "Reviewer").slice(
        0,
        3,
      ) || [],
    [data?.RoleByZone],
  );

  const { permission } = usePermissions({ zoneId });
  const globalPermissions = useGlobalPermissions();

  const { isDownloaded, onDownloadPress } = useDownloadedButton(zoneId);
  const { isFavorite, onFavoritePress } = useFavoritedButton(zoneId);

  if (!data) return <Box />;

  return (
    <A.Box marginTop="s" entering={FadeIn} exiting={FadeOut}>
      {(permission?.has("Update") ||
        globalPermissions.includes(GlobalPermissions.REVIEW_ZONE)) && (
        <Pressable
          marginBottom="s"
          padding="s"
          backgroundColor={zoneStatus(data.currentStatus).backgroundColor}
          borderRadius={16}
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          onPress={() =>
            rootNavigation.navigate(RootNavigationRoutes.ZoneManager, {
              screen: ZoneManagerRoutes.EditZoneStatus,
              params: { zoneId, zoneName },
            })
          }
        >
          <Text color={zoneStatus(data.currentStatus).color}>
            {zoneStatus(data.currentStatus).label}
          </Text>
          <Ionicons
            name="information"
            size={20}
            color={zoneStatus(data.currentStatus).color}
          />
        </Pressable>
      )}
      {data.hasAccess && (
        <Box>
          <Box flexDirection="row" marginBottom="l">
            <StoryButton
              title="Acuerdos"
              iconName="shake-hands"
              onPress={() =>
                navigation.navigate(ClimbsNavigationRoutes.ZoneAgreements, {
                  zoneId,
                  zoneName,
                })
              }
            />
            <StoryButton
              title="Mapa"
              iconName="pin"
              onPress={() =>
                rootNavigation.navigate(RootNavigationRoutes.ZoneLocation, {
                  screen: ZoneLocationRoutes.ZoneMap,
                  params: { zoneId, zoneName },
                })
              }
            />

            <StoryButton
              title="Como llegar"
              iconName="destination"
              onPress={() =>
                rootNavigation.navigate(RootNavigationRoutes.ZoneDirections, {
                  screen: ZoneDirectionsRoutes.ZoneDirections,
                  params: { zoneId, zoneName },
                })
              }
            />
            {featureFlags.storyBar && <StoryButton title="Flora y fauna" />}
          </Box>
          <Pressable
            marginTop="s"
            alignItems="center"
            alignSelf="flex-start"
            flexDirection="row"
            onPress={() =>
              rootNavigation.navigate(RootNavigationRoutes.InfoAccessManager, {
                screen: InfoAccessManagerRoutes.MembersScreen,
                params: { zoneId, zoneName },
              })
            }
          >
            {/* <Box paddingRight="xs">
              <Text>Guía</Text>
            </Box> */}
            <Box
              borderRadius={16}
              padding="s"
              backgroundColor={
                infoAccessAssets[data?.infoAccess].backgroundColor
              }
            >
              <Text color={infoAccessAssets[data?.infoAccess].color}>
                {`Guía ${infoAccessAssets[data?.infoAccess]?.label}`}
              </Text>
            </Box>

            <Box flexDirection="row" marginLeft="s">
              {members.map((role, index) => (
                <UserProfileImage
                  key={role.User.id}
                  publicId={role.User.profilePhoto?.publicId || undefined}
                  style={{
                    height: 32,
                    width: 32,
                    borderRadius: 16,
                    marginLeft: index > 0 ? -10 : 0,
                  }}
                  zIndex={-10 * index + 10}
                />
              ))}
              <Pressable
                height={32}
                width={32}
                style={{ marginLeft: -10, zIndex: -100 }}
                borderRadius={16}
                justifyContent="center"
                alignItems="center"
                backgroundColor="transparentButtonBackground"
              >
                <Ionicons name="ellipsis-horizontal-sharp" size={20} />
              </Pressable>
            </Box>
          </Pressable>
          <ToolBar
            isDownloaded={isDownloaded}
            isFavorite={isFavorite}
            onDownloadPress={onDownloadPress}
            onFavoritePress={onFavoritePress}
          />
        </Box>
      )}
    </A.Box>
  );
};

export default ZoneHeader;
