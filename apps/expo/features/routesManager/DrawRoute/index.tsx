import { Screen, Text } from '@andescalada/ui';
import {
  RoutesManagerNavigationRoutes,
  RoutesManagerScreenProps,
} from '@features/routesManager/Navigation/types';
import { FC } from 'react';

type Props = RoutesManagerScreenProps<RoutesManagerNavigationRoutes.DrawRoute>;

const DrawRoute: FC<Props> = ({ route }) => {
  return (
    <Screen>
      <Text>Holi</Text>
    </Screen>
  );
};

export default DrawRoute;
