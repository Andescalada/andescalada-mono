import { trpc } from "@andescalada/utils/trpc";
import type { Zone } from "@prisma/client";
import deleteSavedImages from "@utils/deleteSavedImages";
import offlineDb from "@utils/quick-sqlite";
import { Alert } from "react-native";

const useDownloadedButton = (zoneId: Zone["id"]) => {
  const utils = trpc.useContext();
  const { data } = trpc.zones.allSectors.useQuery({ zoneId });

  const addToDownloadedList = trpc.user.addToDownloadedZones.useMutation({
    onMutate: async () => {
      await utils.zones.allSectors.cancel();
      const previousData = utils.zones.allSectors.getData({ zoneId });
      utils.zones.allSectors.setData({ zoneId }, (old) =>
        old ? { ...old, isDownloaded: true } : undefined,
      );
      return { previousData };
    },
    onError: (_, __, context) => {
      utils.zones.allSectors.setData({ zoneId }, context?.previousData);
    },
    onSuccess: () => {
      utils.zones.allSectors.invalidate({ zoneId });
      utils.user.getDownloadedAssets.invalidate();
      utils.user.ownInfo.invalidate();
    },
  });

  const removeToDownloadedList = trpc.user.removeToDownloadedZones.useMutation({
    onMutate: async () => {
      await utils.zones.allSectors.cancel();
      const previousData = utils.zones.allSectors.getData({ zoneId });
      utils.zones.allSectors.setData({ zoneId }, (old) =>
        old ? { ...old, isDownloaded: false } : undefined,
      );
      return { previousData };
    },
    onError: (_, __, context) => {
      utils.zones.allSectors.setData({ zoneId }, context?.previousData);
    },
    onSettled: () => {
      utils.zones.allSectors.invalidate({ zoneId });
    },
    onSuccess: () => {
      utils.user.getDownloadedAssets.invalidate();
      utils.user.ownInfo.invalidate();
    },
  });

  const onDownloadPress = () => {
    if (!data?.isDownloaded) {
      addToDownloadedList.mutate({ zoneId });
    } else {
      Alert.alert("Borrar de descargas", "¿Estás seguro?", [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Borrar",
          style: "destructive",
          onPress: async () => {
            await offlineDb.deleteZone(zoneId);
            await deleteSavedImages(zoneId);
            removeToDownloadedList.mutateAsync({ zoneId });
          },
        },
      ]);
    }
  };

  return { onDownloadPress, isDownloaded: !!data?.isDownloaded };
};

export default useDownloadedButton;
