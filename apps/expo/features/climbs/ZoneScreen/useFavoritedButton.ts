import { trpc } from "@andescalada/utils/trpc";
import type { Zone } from "@prisma/client";

const useFavoritedButton = (zoneId: Zone["id"]) => {
  const utils = trpc.useContext();
  const { data } = trpc.zones.allSectors.useQuery({ zoneId });

  const addToFavoriteList = trpc.user.addToFavoriteZones.useMutation({
    onMutate: async () => {
      await utils.zones.allSectors.cancel();
      const previousData = utils.zones.allSectors.getData({ zoneId });
      utils.zones.allSectors.setData(
        (old) => (old ? { ...old, isFavorite: true } : undefined),
        { zoneId },
      );
      return { previousData };
    },
    onError: (_, __, context) => {
      utils.zones.allSectors.setData(context?.previousData);
    },
    onSettled: () => {
      utils.zones.allSectors.invalidate({ zoneId });
    },
  });

  const removeToFavoriteList = trpc.user.removeToFavoriteZones.useMutation({
    onMutate: async () => {
      await utils.zones.allSectors.cancel();
      const previousData = utils.zones.allSectors.getData({ zoneId });
      utils.zones.allSectors.setData(
        (old) => (old ? { ...old, isFavorite: false } : undefined),
        { zoneId },
      );
      return { previousData };
    },
    onError: (_, __, context) => {
      utils.zones.allSectors.setData(context?.previousData);
    },
    onSettled: () => {
      utils.zones.allSectors.invalidate({ zoneId });
    },
  });

  const onFavoritePress = () => {
    if (!data?.isFavorite) {
      addToFavoriteList.mutate({ zoneId });
    } else {
      removeToFavoriteList.mutate({ zoneId });
    }
  };

  return {
    onFavoritePress,
    isFavorite: !!data?.isFavorite,
  };
};

export default useFavoritedButton;
