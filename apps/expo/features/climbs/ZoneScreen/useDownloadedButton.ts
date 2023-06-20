import { downloadedZonesAtom } from "@atoms/index";
import useDeleteAssetsFromDb from "@hooks/useDeleteAsstesFromDb";
import useSetAssetsToDb from "@hooks/useSetAssetsToDb";
import type { Zone } from "@prisma/client";
import { useAtom } from "jotai";
import { useMemo } from "react";
import { Alert } from "react-native";

const useDownloadedButton = (zoneId: Zone["id"], zoneName: Zone["name"]) => {
  const [downloadedZones] = useAtom(downloadedZonesAtom);

  const { setZoneAssetsToDb, isLoading: isDownloading } = useSetAssetsToDb();

  const isDownloaded = useMemo(
    () => !!downloadedZones[zoneId],
    [downloadedZones, zoneId],
  );

  const { isLoading: isDeleteLoading, deleteAssetsFromDb } =
    useDeleteAssetsFromDb();

  const onDownloadPress = async () => {
    if (isDownloading || isDeleteLoading) {
      return;
    }
    if (!isDownloaded) {
      await setZoneAssetsToDb({ zoneId, zoneName });
    } else {
      Alert.alert("Borrar de descargas", "¿Estás seguro?", [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Borrar",
          style: "destructive",
          onPress: () => deleteAssetsFromDb({ zoneId }),
        },
      ]);
    }
  };

  return {
    onDownloadPress,
    isDownloaded,
    isDownloading: isDeleteLoading || isDownloading,
  };
};

export default useDownloadedButton;
