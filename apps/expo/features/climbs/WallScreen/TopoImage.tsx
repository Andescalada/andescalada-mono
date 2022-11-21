import { ActivityIndicator, Box, Pressable, Text } from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import {
  ClimbsNavigationRoutes,
  ClimbsNavigationScreenProps,
} from "@features/climbs/Navigation/types";
import TopoViewer from "@features/routesManager/components/TopoViewer";
import { RoutesManagerNavigationRoutes } from "@features/routesManager/Navigation/types";
import usePickImage from "@hooks/usePickImage";
import useRootNavigation from "@hooks/useRootNavigation";
import useUploadImage from "@hooks/useUploadImage";
import { RootNavigationRoutes } from "@navigation/AppNavigation/RootNavigation/types";
import { useRoute } from "@react-navigation/native";
import { getThumbnail } from "@utils/cloudinary";
import { SCREEN_WIDTH } from "@utils/Dimensions";
import { FC, useState } from "react";
import { Image } from "react-native";

type NavigationRoute =
  ClimbsNavigationScreenProps<ClimbsNavigationRoutes.Wall>["route"];

const TopoImage: FC = () => {
  const route = useRoute<NavigationRoute>();
  const { wallId } = route.params;
  const utils = trpc.useContext();
  const { data, isLoading: isLoadingWall } = trpc.walls.byId.useQuery({
    wallId,
  });

  const mainTopo = data?.topos[0];

  const { pickImage, selectedImage } = usePickImage();

  const { uploadImage } = useUploadImage();

  const { mutate, isSuccess } = trpc.topos.add.useMutation();

  const [isLoadingUpload, setIsLoadingUpload] = useState(false);
  const onUpload = async () => {
    if (!selectedImage) return;
    setIsLoadingUpload(true);
    const image = await uploadImage(selectedImage?.base64Img);
    mutate(
      {
        main: true,
        wallId,
        image,
        name: `${data?.name} topo`,
      },
      {
        onSuccess: () => {
          utils.walls.byId.invalidate({ wallId });
          setIsLoadingUpload(false);
        },
      },
    );
  };

  const rootNavigation = useRootNavigation();

  return (
    <Box flex={0.5}>
      {isLoadingWall && (
        <Box flex={1} justifyContent="center" alignItems="center">
          <ActivityIndicator />
        </Box>
      )}
      {!mainTopo && !selectedImage && !isLoadingWall && (
        <Pressable
          flex={1}
          borderColor="semantic.info"
          borderWidth={2}
          borderRadius={10}
          borderStyle={"dashed"}
          justifyContent="center"
          alignItems={"center"}
          marginVertical="s"
          onPress={pickImage}
        >
          <Text variant={"p1R"}>Agregar topo</Text>
        </Pressable>
      )}
      {selectedImage && !isSuccess && (
        <Pressable
          flex={1}
          borderColor="semantic.info"
          borderWidth={2}
          borderRadius={10}
          borderStyle={"dashed"}
          justifyContent="center"
          alignItems={"center"}
          marginVertical="s"
          overflow="hidden"
          position="relative"
          onPress={onUpload}
        >
          <Box
            position="absolute"
            top={0}
            bottom={0}
            right={0}
            left={0}
            flex={1}
            zIndex={100}
            justifyContent="center"
            alignItems="center"
          >
            <Box
              backgroundColor="textContrast"
              alignItems="stretch"
              paddingHorizontal="s"
            >
              {isLoadingUpload ? (
                <ActivityIndicator padding="s" />
              ) : (
                <Text variant="h2">Subir</Text>
              )}
            </Box>
          </Box>
          <Image
            style={{ flex: 1, width: "100%", height: 1000 }}
            source={{ uri: selectedImage.localUri }}
          />
        </Pressable>
      )}
      {mainTopo?.image.publicId && (
        <Pressable
          flex={1}
          height={100}
          width={SCREEN_WIDTH}
          // position="absolute"
          // borderRadius={10}
          justifyContent="center"
          alignItems={"center"}
          // marginVertical="s"
          // overflow="hidden"
          onPress={() => {
            rootNavigation.navigate(RootNavigationRoutes.RouteManager, {
              screen: RoutesManagerNavigationRoutes.TopoViewer,
              params: {
                topoId: mainTopo.id,
              },
            });
          }}
        >
          <TopoViewer topoId={mainTopo.id} center={false} disableGesture />
        </Pressable>
      )}
    </Box>
  );
};

export default TopoImage;
