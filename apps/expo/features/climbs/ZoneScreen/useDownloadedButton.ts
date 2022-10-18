import { trpc } from "@andescalada/utils/trpc";
import type { Zone } from "@prisma/client";

const useDownloadedButton = (zoneId: Zone["id"]) => {
  const utils = trpc.useContext();
  const { data } = trpc.zones.allSectors.useQuery({ zoneId });
  const addToDownloadedList = trpc.user.addToDownloadedZones.useMutation({
    onMutate: async () => {
      await utils.zones.allSectors.cancel();
      const previousData = utils.zones.allSectors.getData({ zoneId });
      utils.zones.allSectors.setData(
        (old) => (old ? { ...old, isDownloaded: true } : undefined),
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
    onSuccess: () => {
      utils.user.getDownloadedAssets.invalidate();
    },
  });

  const removeToDownloadedList = trpc.user.removeToDownloadedZones.useMutation({
    onMutate: async () => {
      await utils.zones.allSectors.cancel();
      const previousData = utils.zones.allSectors.getData({ zoneId });
      utils.zones.allSectors.setData(
        (old) => (old ? { ...old, isDownloaded: false } : undefined),
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
    onSuccess: () => {
      utils.user.getDownloadedAssets.invalidate();
    },
  });

  const onDownloadPress = () => {
    if (!data?.isDownloaded) {
      addToDownloadedList.mutate({ zoneId });
    } else {
      removeToDownloadedList.mutate({ zoneId });
    }
  };

  return { onDownloadPress, isDownloaded: !!data?.isDownloaded };
};

export default useDownloadedButton;
