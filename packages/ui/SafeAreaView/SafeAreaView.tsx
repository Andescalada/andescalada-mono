import { createBox } from "@shopify/restyle";
import { ComponentProps } from "react";
import { SafeAreaView as ReactSafeAreaView } from "react-native-safe-area-context";

import { Theme } from "../Theme/config";

const SafeAreaView = createBox<Theme, ComponentProps<typeof ReactSafeAreaView>>(
  ReactSafeAreaView,
);

export default SafeAreaView;
