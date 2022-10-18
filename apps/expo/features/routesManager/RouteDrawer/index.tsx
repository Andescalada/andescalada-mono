import {
  SkiaRouteCanvas,
  SkiaRoutePath,
  SkiaRoutePathDrawer,
} from "@andescalada/climbs-drawer";
import { SkiaRouteRef } from "@andescalada/climbs-drawer/SkiaRoutePathDrawer/SkiaRoutePathDrawer";
import {
  ActivityIndicator,
  Box,
  Button,
  Pressable,
  Screen,
  Theme,
} from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  RoutesManagerNavigationRoutes,
  RoutesManagerScreenProps,
} from "@features/routesManager/Navigation/types";
import useCachedImage from "@hooks/useCachedImage";
import type { Route, RoutePath } from "@prisma/client";
import { useValue } from "@shopify/react-native-skia";
import { useTheme } from "@shopify/restyle";
import { optimizedImage } from "@utils/cloudinary";
import { fitContent } from "@utils/Dimensions";
import { FC, useEffect, useRef, useState } from "react";

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

  const [route, setRoute] = useState<SelectedRoute>({
    id: routeParams?.id,
    label: routeParams?.position.toString(),
  });
  const { data: topos } = trpc.topos.byId.useQuery(
    { topoId },
    {
      select(topo) {
        return {
          otherRoutes: topo?.RoutePath.filter(
            (r) => r.Route.id !== routeParams.id,
          ),
          selectedRoute: topo?.RoutePath?.find(
            (r) => r.Route.id === routeParams.id,
          ),
        };
      },
    },
  );

  useEffect(() => {
    if (topos?.selectedRoute) {
      setRoute((prev) => ({
        ...prev,
        path: topos.selectedRoute?.path,
        pathId: topos.selectedRoute?.id,
      }));
    }
  }, [topos?.selectedRoute]);

  const utils = trpc.useContext();
  const { mutate, isLoading } = trpc.routes.addPath.useMutation();

  const [canSave, setCanSave] = useState(false);

  const routeRef = useRef<SkiaRouteRef>(null);

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
            setTimeout(() => navigation.popToTop(), 500);
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

  if (route)
    return (
      <Screen safeAreaDisabled justifyContent="center">
        <SkiaRouteCanvas
          coords={coords}
          imageUrl={fileUrl}
          height={fitted.height}
          width={fitted.width}
        >
          <SkiaRoutePathDrawer
            coords={coords}
            ref={routeRef}
            path={route?.path}
            label={route.label}
            color={theme.colors.drawingRoutePath}
            withStart={!!route.path}
            withEnd={!!route.path}
            scale={fitted.scale}
          />
          {topos?.otherRoutes?.map((route) => (
            <SkiaRoutePath
              key={route.id}
              label={route.Route.position.toString()}
              path={route.path}
              scale={fitted.scale}
              color={theme.colors.routePath}
            />
          ))}
        </SkiaRouteCanvas>
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
        <Box position="absolute" top={50} right={0} margin="l">
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
        </Box>
      </Screen>
    );

  return (
    <Screen justifyContent="center" alignItems="center">
      <ActivityIndicator />
    </Screen>
  );
};

export default DrawRoute;
