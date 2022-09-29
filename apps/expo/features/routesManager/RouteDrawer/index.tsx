import {
  SkiaRouteCanvas,
  SkiaRoutePath,
  SkiaRoutePathDrawer,
  useRoutes,
} from "@andescalada/climbs-drawer";
import { Box, Button, Pressable, Screen, Theme } from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  RoutesManagerNavigationRoutes,
  RoutesManagerScreenProps,
} from "@features/routesManager/Navigation/types";
import useCachedImage from "@hooks/useCachedImage";
import type { RoutePath as RoutePathType } from "@prisma/client";
import { useValue } from "@shopify/react-native-skia";
import { useTheme } from "@shopify/restyle";
import { optimizedImage } from "@utils/cloudinary";
import { fitContent } from "@utils/Dimensions";
import { FC, useState } from "react";

type Props = RoutesManagerScreenProps<RoutesManagerNavigationRoutes.DrawRoute>;

interface RP extends RoutePathType {
  route: {
    id: string;
    position: number;
  };
}

const DrawRoute: FC<Props> = ({ route: navRoute, navigation }) => {
  const theme = useTheme<Theme>();
  const { wallId, route: routeParams, topoId } = navRoute.params;
  const { data } = trpc.walls.byId.useQuery(wallId);
  const [otherRoutes, setOtherRoutes] = useState<RP[]>();
  const [selectedRoutePathId, setSelectedRoutePathId] = useState<
    string | undefined
  >();
  trpc.topos.byId.useQuery(topoId, {
    onSettled(topo) {
      const existingRoutesPath = topo?.RoutePath;
      if (existingRoutesPath) {
        const selectedRoute = existingRoutesPath.find(
          (r) => r.route.id === routeParams.id,
        );
        if (selectedRoute) {
          create({
            id: routeParams.id,
            label: routeParams.position.toString(),
            path: selectedRoute.path,
          });
          setSelectedRoutePathId(selectedRoute.id);
        } else {
          create({
            id: routeParams.id,
            label: routeParams.position.toString(),
          });
        }
      }
      const filteredTopos = topo?.RoutePath.filter(
        (r) => r.route.id !== routeParams.id,
      );

      setOtherRoutes(filteredTopos);
      setRoute({ id: routeParams.id });
    },
  });

  const utils = trpc.useContext();
  const { mutate, isLoading } = trpc.routes.addPath.useMutation();

  const [canSave, setCanSave] = useState(false);
  const { state, methods } = useRoutes();
  const { create, finish, savePath, setRoute } = methods;
  const { route } = state;

  const onFinishOrSave = () => {
    if (!canSave) {
      route?.ref.current?.finishRoute(() =>
        finish({ id: routeParams.id, finished: true }),
      );
      savePath({
        id: routeParams.id,
        path: route?.ref.current?.pointsToString(),
      });
      setCanSave(true);
      return;
    }
    if (route?.path && data) {
      mutate(
        {
          path: route?.path,
          routeId: route.id,
          topoId: data.topos[0].id,
          routePathId: selectedRoutePathId,
        },
        {
          onSuccess: () => {
            utils.topos.byId.invalidate(topoId);
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
            ref={route.ref}
            path={route.path}
            label={route.label}
            color={theme.colors.drawingRoutePath}
            withStart={!!route.path}
            withEnd={!!route.path}
            scale={fitted.scale}
          />
          {otherRoutes?.map((route) => (
            <SkiaRoutePath
              key={route.id}
              label={route.route.position.toString()}
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
              route?.ref.current?.undo();
              setCanSave(false);
              if (route?.finished)
                finish({ id: routeParams.id, finished: false });
            }}
          />
          <Button
            title="Borrar"
            variant={"transparent"}
            titleVariant={"p1R"}
            marginTop="s"
            onPress={() => {
              route?.ref.current?.reset();
              setCanSave(false);
              if (route?.finished)
                finish({ id: routeParams.id, finished: false });
            }}
          />
        </Box>
      </Screen>
    );

  return null;
};

export default DrawRoute;
