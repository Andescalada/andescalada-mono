import { SkiaRouteCanvas, SkiaRoutePath } from "@andescalada/climbs-drawer";
import { Box, Pressable, Screen } from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  RoutesManagerNavigationRoutes,
  RoutesManagerScreenProps,
} from "@features/routesManager/Navigation/types";
import { useAppTheme } from "@hooks/useAppTheme";
import useCachedImage from "@hooks/useCachedImage";
import { optimizedImage } from "@utils/cloudinary";
import { fitContent } from "@utils/Dimensions";
import { FC } from "react";

type Props = RoutesManagerScreenProps<RoutesManagerNavigationRoutes.TopoViewer>;

const TopoViewer: FC<Props> = ({ route: navRoute, navigation }) => {
  const { topoId, routeId } = navRoute.params;
  const { data } = trpc.topos.byId.useQuery(topoId);

  const theme = useAppTheme();

  const image = optimizedImage(data?.image.publicId || undefined);

  const { fileUrl } = useCachedImage(image);

  if (data) {
    const { height, width } = data?.image;
    const fitted = fitContent({ height, width }, "width");

    return (
      <Screen>
        <SkiaRouteCanvas
          imageUrl={fileUrl}
          height={fitted.height}
          width={fitted.width}
        >
          {data.RoutePath.map((path) => {
            return (
              <SkiaRoutePath
                label={path.Route.position.toString()}
                path={path.path}
                key={path.id}
                color={
                  path.Route.id === routeId
                    ? theme.colors["contrast.green"]
                    : theme.colors.routePath
                }
                scale={fitted.scale}
              />
            );
          })}
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
      </Screen>
    );
  }
  return null;
};

export default TopoViewer;
