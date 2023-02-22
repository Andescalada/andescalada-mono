import Animated from "react-native-reanimated";

import Box from "../Box/Box";
import ListItem from "../ListItem/ListItem";
import Pressable from "../Pressable/Pressable";
import { SV } from "../ScrollView/ScrollView";

const A = () => null;

const AnimatedBox = Animated.createAnimatedComponent(Box);
const AnimatedListItem = Animated.createAnimatedComponent(ListItem);
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const AnimatedScrollView = Animated.createAnimatedComponent(SV);

A.Box = AnimatedBox;
A.ListItem = AnimatedListItem;
A.Pressable = AnimatedPressable;
A.ScrollView = AnimatedScrollView;

export default A;
