export interface FeatureFlag {
  storyBar: boolean;
  addZoneFlow: boolean;
  photoContest: boolean;
}

const featureFlags: Record<
  "preview" | "development" | "production",
  FeatureFlag
> = {
  preview: {
    storyBar: true,
    addZoneFlow: true,
    photoContest: true,
  },
  development: {
    storyBar: true,
    addZoneFlow: true,
    photoContest: true,
  },
  production: {
    storyBar: false,
    addZoneFlow: true,
    photoContest: true,
  },
};

export default featureFlags;
