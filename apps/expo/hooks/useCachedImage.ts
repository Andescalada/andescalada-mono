import { cachedImage } from "@utils/FileSystem/cachedImages";
import { useCallback, useEffect, useState } from "react";

const useCachedImage = ({
  url,
  uniqueId,
}: {
  url: string | null;
  uniqueId: string | null;
}) => {
  const [fileUrl, setFileUrl] = useState("");

  const getCachedImage = useCallback(async () => {
    if (!url || !uniqueId) return;
    const res = await cachedImage({ url, uniqueId });
    setFileUrl(res);
  }, [uniqueId, url]);

  useEffect(() => {
    getCachedImage();
  }, [getCachedImage]);

  return { fileUrl, getCachedImage };
};

export default useCachedImage;
