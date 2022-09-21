import { createBox } from "@shopify/restyle";
import { ScrollView as RNScrollView, ScrollViewProps } from "react-native";

import { Theme } from "../Theme/theme";

const ScrollView = createBox<Theme, ScrollViewProps>(RNScrollView);

export default ScrollView;
