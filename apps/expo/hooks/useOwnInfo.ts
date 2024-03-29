import { AppRouter } from "@andescalada/api/src/routers/_app";
import { trpc } from "@andescalada/utils/trpc";
import { useAppDispatch } from "@hooks/redux";
import { autoLoginAuth0 } from "@store/auth";
import { inferProcedureOutput } from "@trpc/server";
import storage from "@utils/mmkv/storage";
import { noNetwork } from "@utils/noNetworkCondition";
import { useEffect, useMemo } from "react";
import { parse, stringify } from "superjson";

type OwnInfoOutput = inferProcedureOutput<AppRouter["user"]["ownInfo"]>;

interface Args {
  withInitialData?: boolean;
}

const useOwnInfo = ({ withInitialData = true }: Args | undefined = {}) => {
  const dispatch = useAppDispatch();

  const ownInfoOutput = storage.getString("ownInfo");

  const parsedStoredOwnInfo = useMemo(
    () => (ownInfoOutput ? parse<OwnInfoOutput>(ownInfoOutput) : undefined),
    [ownInfoOutput],
  );

  const utils = trpc.useContext();

  const ownInfo = trpc.user.ownInfo.useQuery(undefined, {
    staleTime: 1000 * 60,
    initialData: withInitialData ? parsedStoredOwnInfo : undefined,
    onError(err) {
      if (noNetwork(err)) {
        utils.user.ownInfo.setData(undefined, parsedStoredOwnInfo);
        return;
      }
      if (err.data?.code === "UNAUTHORIZED") {
        dispatch(autoLoginAuth0());
        return;
      }
    },
  });

  useEffect(() => {
    if (ownInfo.data) {
      storage.set("ownInfo", stringify(ownInfo.data));
    }
  }, [ownInfo.data]);

  return ownInfo;
};

export const useGetOwnInfo = () => {
  const utils = trpc.useContext();
  const data = utils.user.ownInfo.getData();
  if (!data) throw new Error("ownInfo is undefined");
  return data;
};

export default useOwnInfo;
