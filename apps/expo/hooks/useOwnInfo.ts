import { trpc } from "@andescalada/utils/trpc";

const useOwnInfo = () => {
  return trpc.user.ownInfo.useQuery(undefined, {
    cacheTime: Infinity,
    staleTime: Infinity,
  });
};

export default useOwnInfo;
