import { StatusBar } from 'expo-status-bar';
import NavigationMemoized from '@navigation/NavigationMemoized';
import AppNavigation from '@navigation/AppNavigation';
import { Provider as StoreProvider } from 'react-redux';
import { Store } from '@store/index';
import { useFonts } from 'expo-font';
import { useCallback, useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import ThemeProvider from '@andescalada/ui/Theme/ThemeProvider';
import { darkTheme } from '@andescalada/ui/Theme/navigationTheme';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';

const fonts = {
  'Rubik-300': require('./assets/fonts/Rubik-Light.ttf'),
  'Rubik-400': require('./assets/fonts/Rubik-Regular.ttf'),
  'Rubik-500': require('./assets/fonts/Rubik-Medium.ttf'),
  'Rubik-600': require('./assets/fonts/Rubik-SemiBold.ttf'),
  'Rubik-700': require('./assets/fonts/Rubik-Bold.ttf'),
  'Rubik-800': require('./assets/fonts/Rubik-ExtraBold.ttf'),
  'Rubik-900': require('./assets/fonts/Rubik-Black.ttf'),
  'Rubik-400-Italic': require('./assets/fonts/Rubik-Italic.ttf'),
};

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts(fonts);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    onLayoutRootView();
  }, [onLayoutRootView]);

  if (!fontsLoaded) {
    return null;
  }

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
