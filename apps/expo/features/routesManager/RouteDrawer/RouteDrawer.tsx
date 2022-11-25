import { AppRouter } from "@andescalada/api/src/routers/_app";
import {
  SkiaRouteCanvas,
  SkiaRoutePath,
  SkiaRoutePathDrawer,
} from "@andescalada/climbs-drawer";
import { SkiaRouteRef } from "@andescalada/climbs-drawer/SkiaRoutePathDrawer/SkiaRoutePathDrawer";
import {
  A,
  ActivityIndicator,
  Box,
  Button,
  Pressable,
  Screen,
  Theme,
} from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ClimbsNavigationRoutes } from "@features/climbs/Navigation/types";
import RoutePathConfig from "@features/routesManager/components/RoutePathConfig";
import {
  RoutesManagerNavigationRoutes,
  RoutesManagerScreenProps,
} from "@features/routesManager/Navigation/types";
import Instructions from "@features/routesManager/RouteDrawer/Instructions";
import { useAppSelector } from "@hooks/redux";
import useCachedImage from "@hooks/useCachedImage";
import useRootNavigation from "@hooks/useRootNavigation";
import { RootNavigationRoutes } from "@navigation/AppNavigation/RootNavigation/types";
import type { Route, RoutePath } from "@prisma/client";
import { useValue } from "@shopify/react-native-skia";
import { useTheme } from "@shopify/restyle";
import { inferRouterOutputs } from "@trpc/server";
import { optimizedImage } from "@utils/cloudinary";
import { fitContent } from "@utils/Dimensions";
import { FC, useCallback, useRef, useState } from "react";
import { FadeIn, FadeOut } from "react-native-reanimated";

type Topo = inferRouterOutputs<AppRouter>["topos"]["byId"];

type Props = RoutesManagerScreenProps<RoutesManagerNavigationRoutes.DrawRoute>;

interface SelectedRoute {
  id: Route["id"];
  label: string;
  pathId?: RoutePath["id"];
  path?: RoutePath["path"];
}

const DrawRoute: FC<Props> = ({ route: navRoute, navigation }) => {
  const theme = useTheme<Theme>();
  const { wallId, route: routeParams, topoId } = navRoute.params;
  const { data } = trpc.walls.byId.useQuery({ wallId });

  const [showConfig, setShowConfig] = useState(false);

  const { routeStrokeWidth, showRoutes } = useAppSelector(
    (state) => state.localConfig,
  );

  const [route, setRoute] = useState<SelectedRoute>({
    id: routeParams?.id,
    label: routeParams?.position.toString(),
  });

  const { data: topos } = trpc.topos.byId.useQuery(
    { topoId },
    {
      select: useCallback(
        (topo: Topo) => {
          const otherRoutes = topo?.RoutePath.filter(
            (r) => r.Route.id !== routeParams.id,
          );

          const selectedRoute = topo?.RoutePath?.find(
            (r) => r.Route.id === routeParams.id,
          );

          return {
            otherRoutes,
            selectedRoute,
          };
        },
        [routeParams.id],
      ),
    },
  );

  const utils = trpc.useContext();

  const { mutate, isLoading } = trpc.routes.updateOrCreatePath.useMutation();

  const [canSave, setCanSave] = useState(false);

  const routeRef = useRef<SkiaRouteRef>(null);

  const rootNavigation = useRootNavigation();

  const onFinishOrSave = () => {
    if (!canSave) {
      routeRef?.current?.finishRoute();

      setRoute((prev) => ({
        ...prev,
        id: routeParams.id,
        path: routeRef?.current?.pointsToString(),
      }));
      setCanSave(true);
      return;
    }
    if (route.path && data) {
      if (route.path.length <= 1) {
        navigation.popToTop();
        return;
      }
      mutate(
        {
          path: route.path,
          routeId: route.id,
          topoId: data.topos[0].id,
          routePathId: route.pathId,
        },
        {
          onSuccess: () => {
            utils.topos.byId.invalidate({ topoId });
            setTimeout(
              () =>
                rootNavigation.navigate(RootNavigationRoutes.Climbs, {
                  screen: ClimbsNavigationRoutes.Wall,
                  params: {
                    wallId,
                    wallName: data?.name || "",
                    sectorId: data?.sectorId || "",
                    zoneId: data?.Sector.zoneId || "",
                  },
                }),
              500,
            );
          },
        },
      );
    }
  };

  const { height, width, publicId } = data?.topos[0].image || {
    height: 0,
    width: 0,
    url: "",
    publicId: undefined,
  };

  const image = optimizedImage(publicId || undefined);

  const { fileUrl } = useCachedImage(image);

  const fitted = fitContent({ height, width });
  const coords = useValue({ x: 0, y: 0 });

  if (route && image)
    return (
      <Screen safeAreaDisabled justifyContent="center">
        <Instructions isEditing={!!topos?.selectedRoute?.path} />
        <SkiaRouteCanvas
          coords={coords}
          imageUrl={fileUrl}
          height={fitted.height}
          width={fitted.width}
        >
          <SkiaRoutePathDrawer
            coords={coords}
            ref={routeRef}
            path={topos?.selectedRoute?.path}
            label={routeParams?.position.toString()}
            color={theme.colors.drawingRoutePath}
            withStart={!!topos?.selectedRoute?.path}
            withEnd={!!topos?.selectedRoute?.path}
            scale={fitted.scale}
            strokeWidth={routeStrokeWidth}
          />
          {showRoutes &&
            topos?.otherRoutes?.map((route) => (
              <SkiaRoutePath
                key={route.id}
                label={route.Route.position.toString()}
                path={route.path}
                scale={fitted.scale}
                color={theme.colors.routePath}
                strokeWidth={routeStrokeWidth}
              />
            ))}
        </SkiaRouteCanvas>
        <RoutePathConfig show={showConfig} setShow={setShowConfig} />
        <Box position="absolute" top={50} left={0} margin="l" marginLeft={"s"}>
          <Pressable
            backgroundColor={"transparentButtonBackground"}
            borderRadius={100}
            padding="s"
            onPress={navigation.goBack}
          >
            <Ionicons name="arrow-back" size={30} />
          </Pressable>
        </Box>
        {!showConfig && (
          <A.Box
            position="absolute"
            top={50}
            right={0}
            margin="l"
            entering={FadeIn}
            exiting={FadeOut}
          >
            <Button
              title={canSave ? "Guardar" : "Finalizar"}
              variant={canSave ? "success" : "error"}
              titleVariant={"p1R"}
              isLoading={isLoading}
              onPress={onFinishOrSave}
            />
            <Button
              title="Deshacer"
              variant={"transparent"}
              titleVariant={"p1R"}
              marginTop="s"
              onPress={() => {
                routeRef?.current?.undo();
                setCanSave(false);
              }}
            />
            <Button
              title="Borrar"
              variant={"transparent"}
              titleVariant={"p1R"}
              marginTop="s"
              onPress={() => {
                routeRef?.current?.reset();
                setCanSave(false);
              }}
            />
            <Button
              title="Config"
              variant={"transparent"}
              titleVariant={"p1R"}
              marginTop="s"
              onPress={() => {
                setShowConfig(true);
              }}
            />
          </A.Box>
        )}
      </Screen>
    );

  return (
    <Screen justifyContent="center" alignItems="center">
      <ActivityIndicator />
    </Screen>
  );
};

export default DrawRoute;