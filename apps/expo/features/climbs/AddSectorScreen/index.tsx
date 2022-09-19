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
import sector from '@andescalada/api/schemas/sector';
import {
  ClimbsNavigationRoutes,
  ClimbsNavigationScreenProps,
} from '@features/climbs/Navigation/types';

type Props = ClimbsNavigationScreenProps<ClimbsNavigationRoutes.AddZone>;

const { schema } = sector;

type Form = z.infer<typeof schema>;

const AddSectorScreen: FC<Props> = ({ route, navigation }) => {
  const { zoneId } = route.params;
  const utils = trpc.useContext();
  const { mutate, isLoading } = trpc.sectors.add.useMutation({
    onSuccess: () => {
      navigation.goBack();
      utils.sectors.all.invalidate();
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
    name: 'sectorName',
  });

  const onSubmit = handleSubmit((input) => {
    mutate({ zoneId, name: input.sectorName });
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
      <Text variant="h1">Agregar sector</Text>
      <Box marginTop={'m'}>
        <Text variant={'p1R'} marginBottom={'s'}>
          Nombre del sector
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
