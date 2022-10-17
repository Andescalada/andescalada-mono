import Animated from "react-native-reanimated";

import Box from "../Box/Box";
import ListItem from "../ListItem/ListItem";
import Pressable from "../Pressable/Pressable";

const A = () => null;

const AnimatedBox = Animated.createAnimatedComponent(Box);
const AnimatedListItem = Animated.createAnimatedComponent(ListItem);
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

A.Box = AnimatedBox;
A.ListItem = AnimatedListItem;
A.Pressable = AnimatedPressable;

export default A;
