export default ({ config }) => ({
  ...config,
  slug: config.slug,
  currentFullName: `@${config.owner}/${config.slug}`,
  originalFullName: `@${config.owner}/${config.slug}`,
  owner: config.owner,
});
