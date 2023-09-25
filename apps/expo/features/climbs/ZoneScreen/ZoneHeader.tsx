import infoAccessAssets from "@andescalada/common-assets/infoAccessAssets";
import { RouteAlertSeveritySchema } from "@andescalada/db/zod";
import {
  A,
  Box,
  Button,
  Image,
  Ionicons,
  Pressable,
  ScrollView,
  Text,
} from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import { AlertsRoutes } from "@features/alerts/Navigation/types";
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
import RouteAlertCard from "@features/components/RouteAlertCard";
import { InfoAccessManagerRoutes } from "@features/InfoAccessManager/Navigation/types";
import { ZoneDirectionsRoutes } from "@features/zoneDirections/Navigation/types";
import { ZoneLocationRoutes } from "@features/zoneLocation/Navigation/types";
import { ZoneManagerRoutes } from "@features/zoneManager/Navigation/types";
import useZonesAllSectors from "@hooks/offlineQueries/useZonesAllSectors";
import { useAppTheme } from "@hooks/useAppTheme";
import useCachedImage from "@hooks/useCachedImage";
import useCloudinaryUrl from "@hooks/useCloudinaryUrl";
import useGlobalPermissions from "@hooks/useGlobalPermissions";
import usePermissions from "@hooks/usePermissions";
import useRootNavigation from "@hooks/useRootNavigation";
import useViewImage from "@hooks/useViewImage";
import { RootNavigationRoutes } from "@navigation/AppNavigation/RootNavigation/types";
import { useNavigation, useRoute } from "@react-navigation/native";
import UserProfileImage from "@templates/UserProfileImage/UserProfileImage";
import { GlobalPermissions } from "@utils/auth0/types";
import constants from "@utils/constants";
import { createShareableLink } from "@utils/createSharableLink";
import featureFlags from "@utils/featureFlags";
import { isAndroid } from "@utils/platform";
import zoneStatus from "@utils/zoneStatus";
import { LinearGradient } from "expo-linear-gradient";
import { useMemo } from "react";
import { FlatList, Share, useWindowDimensions } from "react-native";
import { FadeIn, FadeOut, SlideInLeft } from "react-native-reanimated";

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
  const numberOfToposToVerify = trpc.topos.numberOfToposToVerify.useQuery({
    zoneId,
  });

  const routeAlerts = trpc.alerts.list.useQuery({
    zoneId,
    take: 3,
    severity: RouteAlertSeveritySchema.Enum.High,
  });

  const utils = trpc.useContext();

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

  const imageInServer = useCloudinaryUrl("optimizedImage", {
    publicId: data?.coverPhoto?.publicId,
    quality: constants.highImageQuality,
  });

  const { uri } = useCachedImage(imageInServer);

  const screen = useWindowDimensions();
  const theme = useAppTheme();

  const IMAGE_WIDTH = screen.width;
  const IMAGE_HEIGHT = screen.width / (4 / 3) / 2;

  const viewImage = useViewImage();

  if (!data) return <Box />;

  return (
    <A.Box entering={FadeIn} exiting={FadeOut}>
      {imageInServer && (
        <Pressable
          width={IMAGE_WIDTH}
          height={IMAGE_HEIGHT}
          onPress={() => {
            viewImage({
              source: {
                ...uri,
                height: data.coverPhoto?.height,
                width: data.coverPhoto?.width,
              },
            });
          }}
        >
          <Image
            source={uri}
            width={IMAGE_WIDTH}
            height={IMAGE_HEIGHT}
            cachePolicy="memory"
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
          />
          <LinearGradient
            colors={[theme.colors.transparent, theme.colors.background]}
            locations={[0.1, 1]}
            start={{ x: 1, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              height: IMAGE_HEIGHT,
              width: IMAGE_WIDTH,
            }}
          />
        </Pressable>
      )}
      <Box paddingHorizontal="m">
        <ZoneDescription description={data.description?.originalText} />
        {data.hasAccess && (
          <Box>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              flexDirection="row"
              height={82}
            >
              {showPublicationStatus && (
                <Pressable
                  width={60}
                  height={60}
                  justifyContent="center"
                  alignItems="center"
                  borderRadius={30}
                  marginRight="xs"
                  backgroundColor={
                    zoneStatus(data.currentStatus).backgroundColor
                  }
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
                title="Alertas"
                iconName="warning"
                onPress={() =>
                  rootNavigation.navigate(RootNavigationRoutes.Alert, {
                    screen: AlertsRoutes.RouteAlertsList,
                    params: { zoneId },
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
            </ScrollView>
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
            {permission.has("MakeTopoVerification") &&
              typeof numberOfToposToVerify.data === "number" &&
              numberOfToposToVerify.data > 0 && (
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
                    onPress={() => {
                      utils.topos.numberOfToposToVerify.invalidate({
                        zoneId,
                      });
                      navigation.navigate(
                        ClimbsNavigationRoutes.VerifyInformation,
                        {
                          zoneId,
                        },
                      );
                    }}
                  >
                    <Text color="grayscale.white">{`Verificar ${
                      numberOfToposToVerify.data
                    } topo${numberOfToposToVerify.data > 1 && "s"}`}</Text>
                  </Pressable>
                </Box>
              )}
            {routeAlerts?.data && routeAlerts?.data.length > 0 && (
              <A.Box marginTop="m" entering={SlideInLeft} exiting={FadeOut}>
                <Box
                  flexDirection="row"
                  justifyContent="space-between"
                  marginBottom="s"
                >
                  <Text variant="h4">🔴 Alertas altas</Text>
                  <Button
                    variant="transparentSimplified"
                    title="Ver más"
                    titleVariant="p3R"
                    paddingHorizontal="s"
                    onPress={() =>
                      rootNavigation.navigate(RootNavigationRoutes.Alert, {
                        screen: AlertsRoutes.RouteAlertsList,
                        params: { zoneId },
                      })
                    }
                  />
                </Box>
                <FlatList
                  horizontal
                  ListEmptyComponent={() => (
                    <Box
                      height={50}
                      marginTop="s"
                      justifyContent="center"
                      alignItems="center"
                      bg="grayscale.transparent.50.300"
                      borderRadius={8}
                      width="100%"
                      flex={1}
                    >
                      <Text>Sin alertas</Text>
                    </Box>
                  )}
                  data={routeAlerts.data}
                  showsHorizontalScrollIndicator={false}
                  ItemSeparatorComponent={() => <Box width={8} />}
                  renderItem={({ item }) => (
                    <RouteAlertCard
                      id={item.id}
                      title={item.title.originalText}
                      date={item.updatedAt}
                      routeName={item.Route.name}
                      routeId={item.Route.id}
                      sectorName={item.Route.Wall.Sector.name}
                      zoneId={zoneId}
                      kind={item.kind}
                      severity={item.severity}
                      maxWidth={300}
                    />
                  )}
                />
              </A.Box>
            )}
            <ToolBar
              isDownloaded={isDownloaded}
              isFavorite={isFavorite}
              onDownloadPress={onDownloadPress}
              onFavoritePress={onFavoritePress}
              isDownloading={isDownloading}
            />
          </Box>
        )}
      </Box>
    </A.Box>
  );
};

export default ZoneHeader;
