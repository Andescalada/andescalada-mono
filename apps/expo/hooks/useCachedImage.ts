/* eslint-disable @typescript-eslint/no-var-requires */
import { images } from "@assets/images";
import { storeImage } from "@utils/FileSystem/storeImage";
import { useCallback, useEffect, useState } from "react";

const useCachedImage = (args: { url: string; uniqueId: string } | null) => {
  const [fileUrl, setFileUrl] = useState("");

  const getCachedImage = useCallback(async () => {
    if (!args) return;
    const { uniqueId, url } = args;
    const res = await storeImage({ url, uniqueId });
    setFileUrl(res);
  }, [args]);

  useEffect(() => {
    getCachedImage();
  }, [getCachedImage]);

  return {
    fileUrl,
    getCachedImage,
    uri: fileUrl ? { uri: fileUrl } : images.placeholder,
  };
};

export default useCachedImage;
