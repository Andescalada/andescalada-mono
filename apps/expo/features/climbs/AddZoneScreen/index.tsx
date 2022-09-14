import {
  ActivityIndicator,
  Box,
  Pressable,
  Screen,
  Text,
  TextInput,
} from '@andescalada/ui';
import { trpc } from '@andescalada/utils/trpc';
import {
  RootNavigationRoutes,
  RootNavigationScreenProps,
} from '@navigation/AppNavigation/RootNavigation/types';
import { FC, useState } from 'react';
import { Alert } from 'react-native';
import { z } from 'zod';
import { useForm, useController } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
type Props = RootNavigationScreenProps<RootNavigationRoutes.AddZone>;

const schema = z.object({
  sectorName: z
    .string({ required_error: 'Requerido' })
    .min(3, 'Nombre muy corto')
    .max(50, 'Nombre muy largo'),
});

type Form = z.infer<typeof schema>;

const AddZoneScreen: FC<Props> = ({ route, navigation }) => {
  const { zoneId } = route.params;
  const utils = trpc.useContext();
  const { mutate, isLoading } = trpc.useMutation(['sectors.add'], {
    onSuccess: () => {
      navigation.goBack();
      utils.invalidateQueries('sectors.all');
    },
  });

  const { handleSubmit, control } = useForm<Form>({
    resolver: zodResolver(schema),
  });

  const {
    field: { onChange },
    fieldState: { error },
  } = useController({
    control,
    name: 'sectorName',
  });

  const onSubmit = handleSubmit((input) => {
    mutate({ zoneId, name: input.sectorName });
  });

  // const [sectorName, setSectorName] = useState('');
  // const [errorMessage, setErrorMessage] = useState('');

  return (
    <Screen padding="m">
      <Text variant="h1">Agregar sector</Text>
      <Box marginTop={'m'}>
        <Text variant={'p1R'} marginBottom={'s'}>
          Nombre del sector
        </Text>
        <TextInput onChangeText={onChange} containerProps={{ height: 30 }} />
        <Text marginTop={'xs'} color="error">
          {error?.message}
        </Text>
      </Box>
      <Pressable
        backgroundColor={'primaryButtonBackground'}
        borderRadius={5}
        padding="xs"
        justifyContent="center"
        alignItems="center"
        marginTop={'m'}
        onPress={onSubmit}
      >
        {isLoading ? (
          <ActivityIndicator color="primaryButtonText" />
        ) : (
          <Text variant={'h2'} color="primaryButtonText">
            Agregar
          </Text>
        )}
      </Pressable>
      <Pressable
        padding={'xs'}
        justifyContent="center"
        alignItems="center"
        marginTop={'m'}
        onPress={() => {
          Alert.alert('¿Seguro que quieres cancelar?');
        }}
      >
        <Text variant="p1B" color="error">
          Cancelar
        </Text>
      </Pressable>
    </Screen>
  );
};

export default AddZoneScreen;
