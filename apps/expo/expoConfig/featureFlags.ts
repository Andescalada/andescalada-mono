export interface FeatureFlag {
  storyBar: boolean;
  addZoneFlow: boolean;
}

const featureFlags: Record<
  "preview" | "development" | "production",
  FeatureFlag
> = {
  preview: {
    storyBar: true,
    addZoneFlow: true,
  },
  development: {
    storyBar: true,
    addZoneFlow: true,
  },
  production: {
    storyBar: false,
    addZoneFlow: true,
  },
};

export default featureFlags;
