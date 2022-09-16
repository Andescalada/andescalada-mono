import {
  Box,
  Pressable,
  Screen,
  Text,
  ActivityIndicator,
  SemanticButton,
} from '@andescalada/ui';
import { trpc } from '@andescalada/utils/trpc';
import usePickImage from '@hooks/usePickImage';
import useRefresh from '@hooks/useRefresh';
import useUploadImage from '@hooks/useUploadImage';
import { FC, useState } from 'react';
import { FlatList, Image } from 'react-native';
import {
  ClimbsNavigationRoutes,
  ClimbsNavigationScreenProps,
} from '@features/climbs/Navigation/types';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { RoutesManagerNavigationRoutes } from '@features/routesManager/Navigation/types';
import { RootNavigationRoutes } from '@navigation/AppNavigation/RootNavigation/types';
import useRootNavigation from '@hooks/useRootNavigation';

type Props = ClimbsNavigationScreenProps<ClimbsNavigationRoutes.Wall>;

const WallScreen: FC<Props> = ({ route, navigation }) => {
  const { wallId } = route.params;
  const utils = trpc.useContext();
  const { data, refetch, isFetching } = trpc.useQuery([
    'walls.byId',
    route.params.wallId,
  ]);
  const refresh = useRefresh(refetch, isFetching);

  const mainTopo = data?.topos[0];

  const { pickImage, selectedImage } = usePickImage();

  const { uploadImage } = useUploadImage();

  const { mutateAsync } = trpc.useMutation(['topos.add']);

  const [isLoading, setIsLading] = useState(false);
  const onUpload = async () => {
    if (!selectedImage) return;
    setIsLading(true);
    const topoImg = await uploadImage(selectedImage?.base64Img);
    await mutateAsync(
      { wallId, image: topoImg },
      {
        onSuccess: () => {
          utils.invalidateQueries(['walls.byId', wallId]);
        },
      },
    );
    setIsLading(false);
  };

  const { showActionSheetWithOptions } = useActionSheet();

  const rootNavigation = useRootNavigation();

  const onOptions = () => {
    const options = ['Editar Topo', 'Agregar Ruta', 'Cancelar'];
    const cancelButtonIndex = 2;
    const actions = [
      () =>
        rootNavigation.navigate(RootNavigationRoutes.RouteManager, {
          screen: RoutesManagerNavigationRoutes.SelectRouteToDraw,
          params: {
            wallId,
          },
        }),
      () => {
        navigation.navigate(ClimbsNavigationRoutes.AddRoute, {
          wallId,
        });
      },
    ];
    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      (buttonIndex) => {
        if (buttonIndex === undefined || buttonIndex === 2) return;
        actions[buttonIndex]();
      },
    );
  };

  return (
    <Screen padding={'m'}>
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-around"
      >
        <Text variant={'h3'}>{route.params.wallName}</Text>
        <SemanticButton variant="info" title="Opciones" onPress={onOptions} />
      </Box>
      {!mainTopo && !selectedImage && (
        <Pressable
          flex={1 / 2}
          borderColor="info"
          borderWidth={2}
          borderRadius={10}
          borderStyle={'dashed'}
          justifyContent="center"
          alignItems={'center'}
          marginVertical="s"
          onPress={pickImage}
        >
          <Text variant={'p1R'}>Agregar topo</Text>
        </Pressable>
      )}
      {selectedImage && (
        <Pressable
          flex={1 / 2}
          borderColor="info"
          borderWidth={2}
          borderRadius={10}
          borderStyle={'dashed'}
          justifyContent="center"
          alignItems={'center'}
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
              {isLoading ? (
                <ActivityIndicator padding="s" />
              ) : (
                <Text variant="h2">Subir</Text>
              )}
            </Box>
          </Box>
          <Image
            style={{ flex: 1, width: '100%', height: 1000 }}
            source={{ uri: selectedImage.localUri }}
          />
        </Pressable>
      )}
      {mainTopo?.image && (
        <Pressable
          flex={1 / 2}
          borderRadius={10}
          justifyContent="center"
          alignItems={'center'}
          marginVertical="s"
          overflow="hidden"
        >
          <Image
            style={{ flex: 1, width: '100%', height: 1000 }}
            source={{ uri: mainTopo.image }}
          />
        </Pressable>
      )}
      <FlatList
        data={data?.routes}
        refreshControl={refresh}
        contentContainerStyle={{ flex: 1 }}
        ListEmptyComponent={() => (
          <Box flex={1} justifyContent="center" alignItems="center">
            <Text variant={'h3'}>Sin rutas</Text>
          </Box>
        )}
        renderItem={({ item }) => (
          <Pressable
            backgroundColor="listItemBackground"
            alignItems="stretch"
            padding="m"
            marginVertical={'s'}
          >
            <Text variant="p1R">{`${item.position} - ${item.name}`}</Text>
          </Pressable>
        )}
      />
    </Screen>
  );
};

export default WallScreen;
