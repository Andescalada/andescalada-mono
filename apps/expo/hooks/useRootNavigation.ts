import type {
  RootNavigationNavigationProps,
  RootNavigationRoutes,
} from '@navigation/AppNavigation/RootNavigation/types';
import { useNavigation } from '@react-navigation/native';

const useRootNavigation = <T extends RootNavigationRoutes>() => {
  const navigation = useNavigation<RootNavigationNavigationProps<T>>();
  return navigation;
};

export default useRootNavigation;
