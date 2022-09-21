import { AUTH0_DOMAIN } from "@env";
import { Platform } from "react-native";

export const nativeReturnUrl = `andescalada://${AUTH0_DOMAIN}/${Platform.OS}/@eyalll/andescalada-app/callback`;
