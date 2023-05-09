import { trpc } from "@andescalada/utils/trpc";
import { downloadedAssetsListAtom, downloadedZonesAtom } from "@atoms/index";
import type { Zone } from "@prisma/client";
import deleteZoneSavedImages from "@utils/deleteZoneSavedImages";
import { useNotifications } from "@utils/notificated";
import offlineDb from "@utils/quick-sqlite";
import { useAtom } from "jotai";
import { useCallback, useState } from "react";

const useDeleteAssetsFromDb = () => {
  const [downloadedZones, setIsDownloadedZones] = useAtom(downloadedZonesAtom);
  const setDownloadedAssetsList = useAtom(downloadedAssetsListAtom)[1];
  const [isLoading, setIsLoading] = useState(false);

  const notification = useNotifications();

  const utils = trpc.useContext();

  const removeToDownloadedList = trpc.user.removeToDownloadedZones.useMutation({
    onSuccess: () => {
      utils.user.ownInfo.invalidate();
    },
  });

  const deleteAssetsFromDb = useCallback(
    async ({ zoneId }: { zoneId: Zone["id"] }) => {
      setIsLoading(true);
      const currentDownloadedZones = downloadedZones;
      setIsDownloadedZones((old) => {
        delete old[zoneId];
        return old;
      });
      try {
        const db = offlineDb.open();
        const deleteFromDb = offlineDb.deleteZone(db, zoneId);
        const deleteImages = deleteZoneSavedImages(zoneId);
        await Promise.allSettled([deleteFromDb, deleteImages]);
        setDownloadedAssetsList((old) =>
          old.filter((asset) => asset.zoneId !== zoneId),
        );
        db.close();
        removeToDownloadedList.mutate({ zoneId });
      } catch (err) {
        setIsDownloadedZones(currentDownloadedZones);
        notification.notify("error", {
          params: {
            title: "Ha ocurrido un error",
            description: "No se ha podido borrar la zona de descargas",
            hideCloseButton: true,
          },
        });
        throw err;
      }
      setIsLoading(false);
    },
    [
      downloadedZones,
      notification,
      removeToDownloadedList,
      setDownloadedAssetsList,
      setIsDownloadedZones,
    ],
  );

  return { isLoading, deleteAssetsFromDb };
};

export default useDeleteAssetsFromDb;
