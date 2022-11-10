import { trpc } from "@andescalada/utils/trpc";
import type { Zone } from "@prisma/client";

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
    onSettled: () => {
      utils.zones.allSectors.invalidate({ zoneId });
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
    // onSuccess: () => {},
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
