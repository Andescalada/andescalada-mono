import type { Zone } from "@andescalada/db";
import { downloadedZonesAtom } from "@atoms/index";
import useDeleteAssetsFromDb from "@hooks/useDeleteAsstesFromDb";
import useSetAssetsToDb from "@hooks/useSetAssetsToDb";
import { useAtom } from "jotai";
import { useMemo, useState } from "react";
import { Alert } from "react-native";

const useDownloadedButton = (zoneId: Zone["id"], zoneName: Zone["name"]) => {
  const [downloadedZones] = useAtom(downloadedZonesAtom);
  const [isLoading, setIsLoading] = useState(false);

  const { setZoneAssetsToDb } = useSetAssetsToDb();

  const isDownloaded = useMemo(
    () => !!downloadedZones[zoneId],
    [downloadedZones, zoneId],
  );

  const { isLoading: isDeleteLoading, deleteAssetsFromDb } =
    useDeleteAssetsFromDb();

  const onDownloadPress = async () => {
    if (isDeleteLoading || isLoading) {
      return;
    }
    if (!isDownloaded) {
      setIsLoading(true);
      try {
        await setZoneAssetsToDb({ zoneId, zoneName });
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        throw err;
      }
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
    isDownloading: isDeleteLoading || isLoading,
  };
};

export default useDownloadedButton;
