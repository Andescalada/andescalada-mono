import { AppRouter } from "@andescalada/api/src/routers/_app";
import { trpc } from "@andescalada/utils/trpc";
import { useAppDispatch } from "@hooks/redux";
import { logoutAuth0 } from "@store/auth";
import { inferProcedureOutput } from "@trpc/server";
import storage from "@utils/mmkv/storage";
import { noNetwork } from "@utils/noNetworkCondition";
import { useMemo } from "react";
import { parse, stringify } from "superjson";

type OwnInfoOutput = inferProcedureOutput<AppRouter["user"]["ownInfo"]>;

const useOwnInfo = () => {
  const dispatch = useAppDispatch();

  const ownInfoOutput = storage.getString("ownInfo");

  const parsedStoredOwnInfo = useMemo(
    () => (ownInfoOutput ? parse<OwnInfoOutput>(ownInfoOutput) : undefined),
    [ownInfoOutput],
  );

  const utils = trpc.useContext();

  const ownInfo = trpc.user.ownInfo.useQuery(undefined, {
    staleTime: 1000 * 60,
    initialData: parsedStoredOwnInfo,
    onSuccess: (data) => {
      storage.set("ownInfo", stringify(data));
    },
    onError(err) {
      if (err.data?.code === "UNAUTHORIZED") {
        dispatch(logoutAuth0());
      }
      if (noNetwork(err)) {
        utils.user.ownInfo.setData(parsedStoredOwnInfo);
      }
    },
  });

  return ownInfo;
};

export default useOwnInfo;
