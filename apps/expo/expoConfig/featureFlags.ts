export interface FeatureFlag {
  storyBar: boolean;
  addZoneFlow: boolean;
  multiPitch: boolean;
  photoContest: boolean;
}

const featureFlags: Record<
  "preview" | "development" | "production",
  FeatureFlag
> = {
  preview: {
    storyBar: true,
    addZoneFlow: true,
    multiPitch: true,
    photoContest: true,
  },
  development: {
    storyBar: true,
    addZoneFlow: true,
    multiPitch: true,
    photoContest: true,
  },
  production: {
    storyBar: false,
    addZoneFlow: true,
    multiPitch: false,
    photoContest: false,
  },
};

export default featureFlags;
