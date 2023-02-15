import {
  A,
  BackButton,
  Box,
  Ionicons,
  Pressable,
  Screen,
  Text,
} from "@andescalada/ui";
import { routeKindLabel } from "@andescalada/utils/routeKind";
import { trpc } from "@andescalada/utils/trpc";
import RoutePathConfig from "@features/routesManager/components/RoutePathConfig";
import TopoViewer from "@features/routesManager/components/TopoViewer";
import {
  RoutesManagerNavigationRoutes,
  RoutesManagerScreenProps,
} from "@features/routesManager/Navigation/types";
import { useAppSelector } from "@hooks/redux";
import useGradeSystem from "@hooks/useGradeSystem";
import { FC, useEffect, useMemo, useState } from "react";
import { FadeIn, FadeOut } from "react-native-reanimated";

type Props = RoutesManagerScreenProps<RoutesManagerNavigationRoutes.TopoViewer>;

const TopoViewerScreen: FC<Props> = ({ route: navRoute, navigation }) => {
  const { topoId, routeId, zoneId } = navRoute.params;

  const [selectedRoute, setSelectedRoute] = useState<string | undefined>(
    routeId || undefined,
  );

  const { routeStrokeWidth, showRoutes } = useAppSelector(
    (state) => state.localConfig,
  );

  const { data } = trpc.topos.byId.useQuery({ topoId, zoneId });

  const route = useMemo(
    () => data?.RoutePath.find((r) => r.Route.id === selectedRoute)?.Route,
    [data, selectedRoute],
  );

  useEffect(() => () => setSelectedRoute(undefined), []);

  const { gradeLabel } = useGradeSystem();

  const [showConfig, setShowConfig] = useState(false);

  return (
    <Screen>
      <TopoViewer
        routeId={routeId}
        topoId={topoId}
        zoneId={zoneId}
        strokeWidth={Number(data?.routeStrokeWidth) || routeStrokeWidth}
        hide={!showRoutes}
        onSelectedRoute={setSelectedRoute}
      />
      <BackButton.Transparent
        onPress={navigation.goBack}
        iconProps={{ color: "grayscale.black" }}
      />
      {!showConfig && (
        <A.Box
          position="absolute"
          top={50}
          right={0}
          margin="l"
          marginRight="s"
          entering={FadeIn}
          exiting={FadeOut}
        >
          <Pressable
            backgroundColor={"transparentButtonBackground"}
            borderRadius={100}
            padding="s"
            onPress={() => setShowConfig(true)}
          >
            <Ionicons
              name="options-outline"
              size={30}
              color="grayscale.black"
            />
          </Pressable>
        </A.Box>
      )}
      {showConfig && (
        <RoutePathConfig show={showConfig} setShow={setShowConfig} />
      )}
      {selectedRoute && route && (
        <A.Pressable
          position="absolute"
          backgroundColor={"grayscale.transparent.50.black"}
          borderWidth={3}
          borderColor="listItemBackground"
          bottom="5%"
          marginHorizontal="m"
          padding="s"
          borderRadius={5}
          left={0}
          right={0}
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          flex={1}
        >
          <>
            <Box flexDirection="row" alignItems="center" flex={1}>
              <Box
                marginRight="m"
                backgroundColor="grayscale.white"
                borderRadius={20}
                height={30}
                width={30}
                justifyContent="center"
                alignItems="center"
                borderWidth={3}
                borderColor="drawingRoutePath"
              >
                <Text
                  lineHeight={20}
                  fontSize={16}
                  textAlign="center"
                  fontFamily="Rubik-700"
                  color="grayscale.black"
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {route.position}
                </Text>
              </Box>
              <Box flex={1}>
                <Text variant="h4">{route.name}</Text>
                <Text>{routeKindLabel(route.kind).long}</Text>
              </Box>
            </Box>
            <Box>
              <Text variant="p2B">
                {gradeLabel(route.RouteGrade, route.kind)}
              </Text>
            </Box>
          </>
        </A.Pressable>
      )}
    </Screen>
  );
};

export default TopoViewerScreen;
