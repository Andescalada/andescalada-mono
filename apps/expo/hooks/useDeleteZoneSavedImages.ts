import { downloadedImagesAtom } from "@atoms/index";
import { imageVariantsSavedOffline } from "@hooks/useSaveImagesToFileSystem";
import fileSystem from "@utils/FileSystem";
import { useAtom } from "jotai";

const useDeleteZoneSavedImages = () => {
  const downloadedImagesList = useAtom(downloadedImagesAtom)[0];

  const deleteZoneSavedImages = async ({ zoneId }: { zoneId: string }) => {
    const downloadedList = downloadedImagesList[zoneId];
    if (!downloadedList) return;

    downloadedList.forEach(async (asset) => {
      const { publicId } = asset;
      if (!publicId) return;
      await deleteSavedImages(publicId);
    });
  };
  return { deleteZoneSavedImages };
};

export default useDeleteZoneSavedImages;

const deleteSavedImages = (publicId: string) => {
  const variantsToSave = imageVariantsSavedOffline(publicId).map(
    (imageObject) => {
      if (!imageObject) throw new Error("Image not found");
      return fileSystem.deleteImage(imageObject.uniqueId);
    },
  );
  return Promise.allSettled(variantsToSave);
};
