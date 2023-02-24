import { slug } from "@andescalada/api/src/utils/slug";

export const createShareableLink = ({
  zoneId,
  zoneName,
}: {
  zoneName: string;
  zoneId: string;
}) => {
  return `https://www.andescalada.org/zona/${zoneId}/${slug(zoneName)}`;
};
