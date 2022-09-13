import { Box, Screen, Text } from '@andescalada/ui';
import {
  RootNavigationRoutes,
  RootNavigationScreenProps,
} from '@navigation/AppNavigation/RootNavigation/types';
import { FC } from 'react';

type Props = RootNavigationScreenProps<RootNavigationRoutes.Zone>;

const ZoneScreen: FC<Props> = ({ route }) => {
  return (
    <Screen padding="m">
      <Box>
        <Text variant={'h1'}>{route.params.zoneName}</Text>
      </Box>
    </Screen>
  );
};

export default ZoneScreen;
