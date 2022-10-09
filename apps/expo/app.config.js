export default ({ config }) => ({
  ...config,
  slug: config.slug,
  currentFullName: `@${config.owner}/${config.slug}`,
  originalFullName: `@${config.owner}/${config.slug}`,
  owner: config.owner,
  runtimeVersion: {
    policy: "sdkVersion",
  },
  updates: {
    url: "https://u.expo.dev/a034137d-75c2-4941-a3b0-003e7b6ff487",
  },
});
