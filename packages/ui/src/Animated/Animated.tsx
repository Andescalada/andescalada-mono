import Animated from "react-native-reanimated";

import Box from "../Box/Box";
import ListItem from "../ListItem/ListItem";
import Pressable from "../Pressable/Pressable";
import { SV } from "../ScrollView/ScrollView";
import Text from "../Text/Text";

const A = () => null;

const AnimatedBox = Animated.createAnimatedComponent(Box);
const AnimatedListItem = Animated.createAnimatedComponent(ListItem);
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const AnimatedScrollView = Animated.createAnimatedComponent(SV);
const AnimatedText = Animated.createAnimatedComponent(Text);

A.Box = AnimatedBox;
A.ListItem = AnimatedListItem;
A.Pressable = AnimatedPressable;
A.ScrollView = AnimatedScrollView;
A.Text = AnimatedText;

export default A;
