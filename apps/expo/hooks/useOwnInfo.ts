import { trpc } from "@andescalada/utils/trpc";
import { useAppDispatch } from "@hooks/redux";
import { logoutAuth0 } from "@store/auth";
import * as Sentry from "sentry-expo";

const useOwnInfo = () => {
  const dispatch = useAppDispatch();
  return trpc.user.ownInfo.useQuery(undefined, {
    cacheTime: Infinity,
    staleTime: Infinity,
    onError(err) {
      if (err.data?.code === "UNAUTHORIZED") dispatch(logoutAuth0());
      Sentry.Native.captureEvent(err);
    },
  });
};

export default useOwnInfo;
