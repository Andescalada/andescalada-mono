import { useTheme } from '@shopify/restyle';
import { useMemo } from 'react';
import { RefreshControl } from 'react-native';
import { Theme } from '@andescalada/ui/Theme/theme';

const useRefresh = (refetch: () => void, isFetching: boolean) => {
  const theme = useTheme<Theme>();
  const refresh = useMemo(
    () => (
      <RefreshControl
        refreshing={isFetching}
        onRefresh={refetch}
        tintColor={theme.colors.primary}
      />
    ),
    [isFetching, refetch, theme.colors.primary],
  );
  return refresh;
};

export default useRefresh;
