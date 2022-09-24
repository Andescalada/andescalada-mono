import "@utils/rollbar";

import { darkTheme } from "@andescalada/ui/Theme/navigationTheme";
import ThemeProvider from "@andescalada/ui/Theme/ThemeProvider";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import AppNavigation from "@navigation/AppNavigation";
import NavigationMemoized from "@navigation/NavigationMemoized";
import { Store } from "@store/index";
import { StatusBar } from "expo-status-bar";
import { Provider as StoreProvider } from "react-redux";

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
