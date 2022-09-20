import {
  ActivityIndicator,
  Box,
  EditableTitle,
  Pressable,
  Screen,
  SemanticButton,
  Text,
} from '@andescalada/ui';
import { trpc } from '@andescalada/utils/trpc';
import useRefresh from '@hooks/useRefresh';
import { FC, useState } from 'react';
import { Alert, FlatList } from 'react-native';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import sector from '@andescalada/api/schemas/sector';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ClimbsNavigationRoutes,
  ClimbsNavigationScreenProps,
} from '@features/climbs/Navigation/types';
import useOptionsSheet from '@hooks/useOptionsSheet';

const { schema } = sector;

type Form = z.infer<typeof schema>;

type Props = ClimbsNavigationScreenProps<ClimbsNavigationRoutes.Sector>;

const SectorScreen: FC<Props> = ({ route, navigation }) => {
  const [editing, setEditing] = useState(false);
  const [cancel, setCancel] = useState(false);
  const utils = trpc.useContext();
  const { data, refetch, isFetching, isLoading } =
    trpc.sectors.allWalls.useQuery({ sectorId: route.params.sectorId });
  const editSector = trpc.sectors.edit.useMutation({
    onSuccess: () => {
      utils.zones.allSectors.invalidate({ zoneId: route.params.zoneId });
    },
  });
  const methods = useForm<Form>({
    resolver: zodResolver(schema),
  });

  const refresh = useRefresh(refetch, isFetching);

  const onSave = cancel
    ? () => {
        setEditing(false);
        setCancel(false);
      }
    : methods.handleSubmit(
        (input) => {
          editSector.mutate({
            name: input.sectorName,
            sectorId: route.params.sectorId,
          });
          setEditing(false);
        },
        (error) => {
          const errorMessage = error.sectorName?.message || 'Hubo un error';
          Alert.alert(errorMessage);
          methods.setValue('sectorName', route.params.sectorName);
          setEditing(false);
        },
      );

  const onOptions = useOptionsSheet({
    'Agregar Pared': () =>
      navigation.navigate(ClimbsNavigationRoutes.AddWall, {
        sectorId: route.params.sectorId,
      }),
    'Cambiar Nombre': () => {
      setEditing(true);
    },
  });

  if (isLoading)
    return (
      <Screen justifyContent="center" alignItems="center">
        <ActivityIndicator size={'large'} />
      </Screen>
    );
  return (
    <Screen padding="m">
      <Box
        flexDirection={'row'}
        alignItems="center"
        justifyContent={'space-between'}
      >
        <EditableTitle
          title={route.params.sectorName}
          name="sectorName"
          editable={editing}
          control={methods.control}
        />

        <SemanticButton
          variant={cancel ? 'error' : 'info'}
          title={editing ? (cancel ? 'Cancelar' : 'Guardar') : 'Opciones'}
          onPress={editing ? onSave : onOptions}
          onLongPress={() => {
            if (editing) setCancel(true);
          }}
        />
      </Box>
      <Box flex={1}>
        <FlatList
          data={data}
          refreshControl={refresh}
          contentContainerStyle={{ flex: 1 }}
          ListEmptyComponent={() => (
            <Box flex={1} justifyContent="center" alignItems="center">
              <Text variant={'h3'}>Sin paredes</Text>
            </Box>
          )}
          renderItem={({ item }) => (
            <Pressable
              backgroundColor="listItemBackground"
              alignItems="stretch"
              padding="m"
              marginVertical={'s'}
              onPress={() =>
                navigation.navigate(ClimbsNavigationRoutes.Wall, {
                  wallId: item.id,
                  wallName: item.name,
                  sectorId: route.params.sectorId,
                })
              }
            >
              <Text variant="p1R">{item.name}</Text>
            </Pressable>
          )}
        />
      </Box>
    </Screen>
  );
};

export default SectorScreen;
