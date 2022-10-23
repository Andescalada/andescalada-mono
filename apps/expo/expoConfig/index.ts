import type { ConfigContext, ExpoConfig } from "@expo/config";

import developmentConfig from "./development.config";
import previewConfig from "./preview.config";
import productionConfig from "./production.config";

export default ({ config }: ConfigContext): ExpoConfig => variantConfig(config);

const variantConfig = (config: ConfigContext["config"]): ExpoConfig => {
  if (process.env.APP_VARIANT === "development") {
    return developmentConfig(config);
  }
  if (process.env.APP_VARIANT === "preview") {
    return previewConfig(config);
  }
  return productionConfig(config);
};
