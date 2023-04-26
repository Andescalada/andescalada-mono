import { urlGen } from "@andescalada/utils/cloudinary";
import { useMemo } from "react";

const useCloudinaryUrl = <F extends keyof typeof urlGen>(
  key: F,
  args: Parameters<(typeof urlGen)[F]>[0],
) => {
  // @ts-expect-error
  const url = useMemo(() => urlGen[key](args), [key, args]);
  return url;
};

export default useCloudinaryUrl;
