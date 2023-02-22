export interface FeatureFlag {
  storyBar: boolean;
  addZoneFlow: boolean;
  multiPitch: boolean;
}

const featureFlags: Record<
  "preview" | "development" | "production",
  FeatureFlag
> = {
  preview: {
    storyBar: true,
    addZoneFlow: true,
    multiPitch: true,
  },
  development: {
    storyBar: true,
    addZoneFlow: true,
    multiPitch: true,
  },
  production: {
    storyBar: false,
    addZoneFlow: true,
    multiPitch: false,
  },
};

export default featureFlags;
