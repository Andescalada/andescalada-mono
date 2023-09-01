import infoAccessAssets from "@andescalada/common-assets/infoAccessAssets";
import { A, Box, Ionicons, Pressable, Text } from "@andescalada/ui";
import {
  ClimbsNavigationNavigationProps,
  ClimbsNavigationRouteProps,
  ClimbsNavigationRoutes,
} from "@features/climbs/Navigation/types";
import StoryButton from "@features/climbs/ZoneScreen/StoryButton";
import ToolBar from "@features/climbs/ZoneScreen/ToolBar";
import useDownloadedButton from "@features/climbs/ZoneScreen/useDownloadedButton";
import useFavoritedButton from "@features/climbs/ZoneScreen/useFavoritedButton";
import ZoneDescription from "@features/climbs/ZoneScreen/ZoneDescription";
import { InfoAccessManagerRoutes } from "@features/InfoAccessManager/Navigation/types";
import { ZoneDirectionsRoutes } from "@features/zoneDirections/Navigation/types";
import { ZoneLocationRoutes } from "@features/zoneLocation/Navigation/types";
import { ZoneManagerRoutes } from "@features/zoneManager/Navigation/types";
import useZonesAllSectors from "@hooks/offlineQueries/useZonesAllSectors";
import useGlobalPermissions from "@hooks/useGlobalPermissions";
import usePermissions from "@hooks/usePermissions";
import useRootNavigation from "@hooks/useRootNavigation";
import { RootNavigationRoutes } from "@navigation/AppNavigation/RootNavigation/types";
import { useNavigation, useRoute } from "@react-navigation/native";
import UserProfileImage from "@templates/UserProfileImage/UserProfileImage";
import { GlobalPermissions } from "@utils/auth0/types";
import { createShareableLink } from "@utils/createSharableLink";
import featureFlags from "@utils/featureFlags";
import { isAndroid } from "@utils/platform";
import zoneStatus from "@utils/zoneStatus";
import { useMemo } from "react";
import { Share } from "react-native";
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

  const { data } = useZonesAllSectors({ zoneId });

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

  const { isDownloaded, onDownloadPress, isDownloading } = useDownloadedButton(
    zoneId,
    zoneName,
  );
  const { isFavorite, onFavoritePress } = useFavoritedButton(zoneId);

  const showPublicationStatus =
    permission?.has("PublishZone") ||
    globalPermissions.includes(GlobalPermissions.REVIEW_ZONE);

  if (!data) return <Box />;

  return (
    <A.Box entering={FadeIn} exiting={FadeOut}>
      <ZoneDescription description={data.description?.originalText} />
      {data.hasAccess && (
        <Box>
          <Box flexDirection="row" marginBottom="l">
            {showPublicationStatus && (
              <Pressable
                width={60}
                height={60}
                justifyContent="center"
                alignItems="center"
                borderRadius={30}
                marginRight="xs"
                backgroundColor={zoneStatus(data.currentStatus).backgroundColor}
                onPress={() =>
                  rootNavigation.navigate(RootNavigationRoutes.ZoneManager, {
                    screen: ZoneManagerRoutes.EditZoneStatus,
                    params: { zoneId, zoneName },
                  })
                }
              >
                <Ionicons
                  name={zoneStatus(data.currentStatus).icon}
                  size={30}
                  color={zoneStatus(data.currentStatus).color}
                />
              </Pressable>
            )}
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
          <Box
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Pressable
              marginTop="s"
              alignItems="center"
              alignSelf="flex-start"
              flexDirection="row"
              onPress={() =>
                rootNavigation.navigate(
                  RootNavigationRoutes.InfoAccessManager,
                  {
                    screen: InfoAccessManagerRoutes.MembersScreen,
                    params: { zoneId, zoneName },
                  },
                )
              }
            >
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

              {members.length === 0 && <Box marginLeft="s" />}

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
                <Box
                  height={32}
                  width={32}
                  style={{ marginLeft: -10, zIndex: -100 }}
                  borderRadius={16}
                  justifyContent="center"
                  alignItems="center"
                  backgroundColor="transparentButtonBackground"
                >
                  <Ionicons name="ellipsis-horizontal-sharp" size={20} />
                </Box>
              </Box>
            </Pressable>
            <Pressable
              height={32}
              width={32}
              borderRadius={32}
              bg="zoneOptionsIcons"
              overflow="hidden"
              borderColor="text"
              justifyContent="center"
              alignItems="center"
              onPress={() =>
                Share.share({
                  message: `Estos son los topos de ${zoneName} ${
                    isAndroid ? createShareableLink({ zoneId, zoneName }) : ""
                  }`,
                  url: createShareableLink({ zoneId, zoneName }),
                  title: `Zona ${zoneName}`,
                })
              }
            >
              <Box
                position="absolute"
                top={5}
                right={isAndroid ? 7 : 5}
                height={20}
                width={20}
              >
                <Ionicons
                  name={isAndroid ? "share-social" : "share"}
                  color="background"
                  size={20}
                />
              </Box>
            </Pressable>
          </Box>
          <Box
            marginTop="s"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Pressable
              bg="semantic.transparent.50.success"
              borderRadius={16}
              padding="s"
              onPress={() =>
                navigation.navigate(ClimbsNavigationRoutes.VerifyInformation, {
                  zoneId,
                })
              }
            >
              <Text color="grayscale.white">Verificar información</Text>
            </Pressable>
          </Box>
          <ToolBar
            isDownloaded={isDownloaded}
            isFavorite={isFavorite}
            onDownloadPress={onDownloadPress}
            onFavoritePress={onFavoritePress}
            isDownloading={isDownloading}
          />
        </Box>
      )}
    </A.Box>
  );
};

export default ZoneHeader;
