import {
  ActivityIndicator,
  Box,
  Pressable,
  Screen,
  SemanticButton,
  Text,
  TextInput,
} from '@andescalada/ui';
import { trpc } from '@andescalada/utils/trpc';
import useRefresh from '@hooks/useRefresh';
import { FC, useState } from 'react';
import { Alert, FlatList } from 'react-native';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { useController, useForm } from 'react-hook-form';
import { z } from 'zod';
import sector from '@andescalada/api/schemas/sector';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ClimbsNavigationRoutes,
  ClimbsNavigationScreenProps,
} from '@navigation/AppNavigation/RootNavigation/ClimbsNavigation/types';

const { schema } = sector;

type Form = z.infer<typeof schema>;

type Props = ClimbsNavigationScreenProps<ClimbsNavigationRoutes.Sector>;

const SectorScreen: FC<Props> = ({ route, navigation }) => {
  const { showActionSheetWithOptions } = useActionSheet();
  const [editing, setEditing] = useState(false);
  const [cancel, setCancel] = useState(false);
  const utils = trpc.useContext();
  const { data, refetch, isFetching, isLoading } = trpc.useQuery([
    'sectors.allWalls',
    { sectorId: route.params.sectorId },
  ]);
  const editSector = trpc.useMutation('sectors.edit', {
    onSuccess: () => {
      utils.invalidateQueries([
        'zones.allSectors',
        { zoneId: route.params.zoneId },
      ]);
    },
  });
  const { control, handleSubmit } = useForm<Form>({
    resolver: zodResolver(schema),
  });
  const {
    field: { onChange, value },
  } = useController({
    name: 'sectorName',
    control,
    defaultValue: route.params.sectorName,
  });
  const refresh = useRefresh(refetch, isFetching);

  const onSave = cancel
    ? () => {
        setEditing(false);
        setCancel(false);
      }
    : handleSubmit(
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
          onChange(route.params.sectorName);
          setEditing(false);
        },
      );

  const onOptions = () => {
    const options = ['Agregar Pared', 'Cambiar Nombre', 'Cancelar'];
    const cancelButtonIndex = 2;
    const actions = [
      () =>
        navigation.navigate(ClimbsNavigationRoutes.AddWall, {
          sectorId: route.params.sectorId,
        }),
      () => {
        setEditing(true);
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
        <TextInput
          value={value}
          variant={editing ? 'filled' : 'disableAsText'}
          editable={editing}
          onChangeText={onChange}
          textVariant="h3"
          lineHeight={20}
          multiline
          textAlignVertical="top"
          containerProps={{
            justifyContent: 'center',
            flex: 1,
          }}
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
