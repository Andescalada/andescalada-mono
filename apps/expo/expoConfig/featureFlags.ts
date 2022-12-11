export interface FeatureFlag {
  storyBar: boolean;
}

const featureFlags: Record<
  "preview" | "development" | "production",
  FeatureFlag
> = {
  preview: {
    storyBar: true,
  },
  development: {
    storyBar: true,
  },
  production: {
    storyBar: false,
  },
};

export default featureFlags;
