import { AppRouter } from "@andescalada/api/src/routers/_app";
import { trpc } from "@andescalada/utils/trpc";
import { useAppDispatch } from "@hooks/redux";
import { logoutAuth0 } from "@store/auth";
import { inferProcedureOutput } from "@trpc/server";
import storage from "@utils/mmkv/storage";
import { useEffect } from "react";
import * as Sentry from "sentry-expo";
import { parse, stringify } from "superjson";

type OwnInfoOutput = inferProcedureOutput<AppRouter["user"]["ownInfo"]>;

const useOwnInfo = () => {
  const dispatch = useAppDispatch();

  const ownInfoOutput = storage.getString("ownInfo");

  const ownInfo = trpc.user.ownInfo.useQuery(undefined, {
    cacheTime: Infinity,
    staleTime: Infinity,
    initialData: ownInfoOutput
      ? parse<OwnInfoOutput>(ownInfoOutput)
      : undefined,
    onSuccess: (data) => {
      storage.set("ownInfo", stringify(data));
    },
    onError(err) {
      if (err.data?.code === "UNAUTHORIZED") dispatch(logoutAuth0());
      Sentry.Native.captureEvent(err);
    },
  });

  return ownInfo;
};

export default useOwnInfo;
