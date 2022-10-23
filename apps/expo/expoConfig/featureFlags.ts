export interface FeatureFlag {
  offline: boolean;
}

const featureFlags: Record<
  "preview" | "development" | "production",
  FeatureFlag
> = {
  preview: {
    offline: true,
  },
  development: {
    offline: true,
  },
  production: {
    offline: false,
  },
};

export default featureFlags;
