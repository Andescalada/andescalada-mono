import { Permissions } from "@andescalada/api/src/types/permissions";
import { UPSTASH_REDIS_REST_TOKEN, UPSTASH_REDIS_REST_URL } from "@env";
import { useAppSelector } from "@hooks/redux";
import type { Zone } from "@prisma/client";
import storage, { Store } from "@utils/mmkv/storage";
import { useCallback, useEffect, useState } from "react";
import { parse } from "superjson";

const getPermissionsFromUpstash = (key: string, value: string) =>
  fetch(`${UPSTASH_REDIS_REST_URL}/hget/${key}/${value}`, {
    headers: {
      Authorization: `Bearer ${UPSTASH_REDIS_REST_TOKEN}`,
    },
  })
    .then((r) => r.json())
    .then((r) => r.result);

interface Args {
  zoneId: Zone["id"];
}

const usePermissions = ({ zoneId }: Args) => {
  const { email } = useAppSelector((state) => state.auth);

  const [permission, setPermissions] = useState<Permissions | undefined>(
    undefined,
  );

  const getPermissions = useCallback(async () => {
    if (!email) throw new Error("No email found");
    let res = storage.getString(`${Store.PERMISSIONS}.${email}.${zoneId}`);
    if (!res) {
      res = await getPermissionsFromUpstash(email, zoneId);
    }

    if (!res) {
      setPermissions(new Set());
      return;
    }
    storage.set(`${Store.PERMISSIONS}.${email}.${zoneId}`, res);

    const deserializedRes = parse<Permissions>(res);

    setPermissions(deserializedRes);
  }, [email, zoneId]);

  useEffect(() => {
    getPermissions();
  }, [getPermissions]);

  return { permission, getPermissions };
};

export default usePermissions;
