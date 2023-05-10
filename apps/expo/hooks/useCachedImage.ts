/* eslint-disable @typescript-eslint/no-var-requires */
import { images } from "@assets/images";
import { useQuery } from "@tanstack/react-query";
import fileSystem from "@utils/FileSystem";

type Args = { url: string; uniqueId: string } | null;

const getCachedImage = async (args: Args) => {
  if (!args) return null;
  const { uniqueId, url } = args;
  const res = await fileSystem.storeImage({ url, uniqueId });
  return res;
};

const useCachedImage = (args: Args) => {
  const { data, ...rest } = useQuery({
    staleTime: 0,
    networkMode: "always",
    queryKey: ["storedImage", args],
    queryFn: () => getCachedImage(args),
  });

  return {
    fileUrl: data || "",
    getCachedImage,
    uri: data ? { uri: data } : images.placeholder.file,
    ...rest,
  };
};

export default useCachedImage;
