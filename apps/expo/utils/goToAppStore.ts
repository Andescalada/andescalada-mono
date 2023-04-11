import constants from "@utils/constants";
import { isAndroid } from "@utils/platform";
import { Linking } from "react-native";

const goToAppStore = () => {
  const url = isAndroid ? constants.googlePlayStoreUrl : constants.appStoreUrl;
  return Linking.openURL(url);
};

export default goToAppStore;
