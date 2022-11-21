import { Platform } from "react-native";

const disableForAndroid = Platform.OS !== "android";

export default { disableForAndroid };
