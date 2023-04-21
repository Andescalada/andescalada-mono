/* eslint-disable @typescript-eslint/no-var-requires */
import { images } from "@assets/images";
import fileSystem from "@utils/FileSystem";
import { useCallback, useEffect, useState } from "react";

const useCachedImage = (args: { url: string; uniqueId: string } | null) => {
  const [fileUrl, setFileUrl] = useState("");

  const getCachedImage = useCallback(async () => {
    if (!args) return;
    const { uniqueId, url } = args;
    const res = await fileSystem.storeImage({ url, uniqueId });

    console.log(res);
    setFileUrl(res);
  }, [args]);

  const deleteImage = async (uniqueId: string) => {
    await fileSystem.deleteImage(uniqueId, true);
  };

  useEffect(() => {
    getCachedImage();
  }, [args?.uniqueId, getCachedImage]);

  return {
    fileUrl,
    getCachedImage,
    uri: fileUrl ? { uri: fileUrl } : images.placeholder.file,
  };
};

export default useCachedImage;
