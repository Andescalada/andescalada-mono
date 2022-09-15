import {
  Box,
  Button,
  Screen,
  SemanticButton,
  Text,
  TextInput,
} from '@andescalada/ui';
import { trpc } from '@andescalada/utils/trpc';

import { FC } from 'react';
import { Alert } from 'react-native';
import { z } from 'zod';
import { useForm, useController } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ClimbsNavigationRoutes,
  ClimbsNavigationScreenProps,
} from '@navigation/AppNavigation/RootNavigation/ClimbsNavigation/types';

type Props = ClimbsNavigationScreenProps<ClimbsNavigationRoutes.AddWall>;

const schema = z.object({
  wallName: z
    .string({ required_error: 'Requerido' })
    .min(3, 'Nombre muy corto')
    .max(50, 'Nombre muy largo'),
});

type Form = z.infer<typeof schema>;

const AddSectorScreen: FC<Props> = ({ route, navigation }) => {
  const { sectorId } = route.params;
  const utils = trpc.useContext();
  const { mutate, isLoading } = trpc.useMutation(['walls.add'], {
    onSuccess: () => {
      navigation.goBack();
      utils.invalidateQueries('sectors.allWalls');
    },
  });

  const { handleSubmit, control } = useForm<Form>({
    resolver: zodResolver(schema),
  });

  const {
    field: { onChange },
    fieldState: { error, isDirty },
  } = useController({
    control,
    name: 'wallName',
  });

  const onSubmit = handleSubmit((input) => {
    mutate({ sectorId, name: input.wallName });
  });

  const onCancel = () => {
    if (!isDirty) {
      navigation.goBack();
      return;
    }
    Alert.alert('¿Seguro que quieres cancelar?', '', [
      {
        text: 'Si',
        onPress: () => navigation.goBack(),
      },
      {
        text: 'Cancelar',
        style: 'cancel',
      },
    ]);
  };

  return (
    <Screen padding="m">
      <Text variant="h1">Agregar pared</Text>
      <Box marginTop={'m'}>
        <Text variant={'p1R'} marginBottom={'s'}>
          Nombre de la pared
        </Text>
        <TextInput onChangeText={onChange} containerProps={{ height: 40 }} />
        <Text marginTop={'xs'} color="error">
          {error?.message}
        </Text>
      </Box>
      <Button
        variant="primary"
        title="Agregar"
        onPress={onSubmit}
        isLoading={isLoading}
        marginVertical="s"
      />
      <SemanticButton variant="error" title="Cancelar" onPress={onCancel} />
    </Screen>
  );
};

export default AddSectorScreen;
