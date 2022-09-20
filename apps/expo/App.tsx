import { StatusBar } from 'expo-status-bar';
import NavigationMemoized from '@navigation/NavigationMemoized';
import AppNavigation from '@navigation/AppNavigation';
import { Provider as StoreProvider } from 'react-redux';
import { Store } from '@store/index';

import ThemeProvider from '@andescalada/ui/Theme/ThemeProvider';
import { darkTheme } from '@andescalada/ui/Theme/navigationTheme';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';

export default function App() {
  return (
    <ThemeProvider>
      <StoreProvider store={Store}>
        <NavigationMemoized theme={darkTheme}>
          <ActionSheetProvider>
            <>
              <StatusBar style="light" />
              <AppNavigation />
            </>
          </ActionSheetProvider>
        </NavigationMemoized>
      </StoreProvider>
    </ThemeProvider>
  );
}
