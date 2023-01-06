import { trpc } from "@andescalada/utils/trpc";
import type { Zone } from "@prisma/client";
import { Alert } from "react-native";

const useFavoritedButton = (zoneId: Zone["id"]) => {
  const utils = trpc.useContext();
  const { data } = trpc.zones.allSectors.useQuery({ zoneId });

  const addToFavoriteList = trpc.user.addToFavoriteZones.useMutation({
    onMutate: async () => {
      await utils.zones.allSectors.cancel();
      const previousData = utils.zones.allSectors.getData({ zoneId });
      utils.zones.allSectors.setData({ zoneId }, (old) =>
        old ? { ...old, isFavorite: true } : undefined,
      );
      return { previousData };
    },
    onError: (_, __, context) => {
      utils.zones.allSectors.setData({ zoneId }, context?.previousData);
      Alert.alert("Error", "No se pudo agregar a favoritos");
    },
    onSuccess: () => {
      utils.zones.allSectors.invalidate({ zoneId });
      utils.user.ownInfo.invalidate();
    },
  });

  const removeToFavoriteList = trpc.user.removeToFavoriteZones.useMutation({
    onMutate: async () => {
      await utils.zones.allSectors.cancel();
      const previousData = utils.zones.allSectors.getData({ zoneId });
      utils.zones.allSectors.setData({ zoneId }, (old) =>
        old ? { ...old, isFavorite: false } : undefined,
      );
      return { previousData };
    },
    onError: (_, __, context) => {
      Alert.alert("Error", "No se pudo eliminar de favoritos");
      utils.zones.allSectors.setData({ zoneId }, context?.previousData);
    },
    onSuccess: () => {
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
