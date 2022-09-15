import { Screen, Text } from '@andescalada/ui';
import {
  RootNavigationRoutes,
  RootNavigationScreenProps,
} from '@navigation/AppNavigation/RootNavigation/types';
import { FC } from 'react';

type Props = RootNavigationScreenProps<RootNavigationRoutes.Wall>;

const WallScreen: FC<Props> = ({ route, navigation }) => {
  return (
    <Screen padding={'m'}>
      <Text variant={'h3'}>{route.params.wallName}</Text>
    </Screen>
  );
};

export default WallScreen;
