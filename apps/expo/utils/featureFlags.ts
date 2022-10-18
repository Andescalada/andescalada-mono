import { FF_OFFLINE } from "@env";

const featureFlags = {
  offline: FF_OFFLINE === "true",
};

export default featureFlags;
