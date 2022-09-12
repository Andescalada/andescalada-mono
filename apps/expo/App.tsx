import { StatusBar } from 'expo-status-bar';
import NavigationMemoized from '@navigation/NavigationMemoized';
import AppNavigation from '@navigation/AppNavigation';
import { Provider as StoreProvider } from 'react-redux';
import { Store } from '@store/index';

export default function App() {
  return (
    <StoreProvider store={Store}>
      <NavigationMemoized>
        <StatusBar style="auto" />
        <AppNavigation />
      </NavigationMemoized>
    </StoreProvider>
  );
}
