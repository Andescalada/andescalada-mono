import { createBox } from "@shopify/restyle";
import { ScrollView as RNScrollView, ScrollViewProps } from "react-native";
import { ScrollView as RNGHScrollView } from "react-native-gesture-handler";

import { Theme } from "../Theme/theme";

const SV = createBox<Theme, ScrollViewProps>(RNScrollView);

type RNGHScrollViewProps = React.ComponentProps<typeof RNGHScrollView>;

const Gesture = createBox<Theme, RNGHScrollViewProps>(RNGHScrollView);

const ScrollView: typeof SV & { Gesture: typeof Gesture } = SV as any;

ScrollView.Gesture = Gesture;

export default ScrollView;
