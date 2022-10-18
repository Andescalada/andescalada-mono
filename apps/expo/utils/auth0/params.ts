import Env from "@utils/env";
import { Platform } from "react-native";

export const nativeReturnUrl = `andescalada://${Env.AUTH0_DOMAIN}/${Platform.OS}/@andescalada/andescalada-app/callback`;
