import Constants from "expo-constants";
import { Client, Configuration } from "rollbar-react-native";

const ROLLBAR_ACCESS_TOKEN = "7a212b86816d4d60a02dba9e7b81a2fa";

const config = new Configuration(ROLLBAR_ACCESS_TOKEN, {
  appVersion: Constants.manifest?.version,
  captureUncaught: true,
  captureUnhandledRejections: true,
  enabled: !__DEV__,
});

const rollbar = new Client(config);

export default rollbar;
