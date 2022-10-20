import { Permissions } from "@andescalada/api/src/types/permissions";
import { useAppSelector } from "@hooks/redux";
import type { Zone } from "@prisma/client";
import { isExpired } from "@utils/decode";
import Env from "@utils/env";
import storage, { Store } from "@utils/mmkv/storage";
import { useCallback, useEffect, useState } from "react";
import * as Sentry from "sentry-expo";
import { parse, stringify } from "superjson";

const PERMISSIONS_DURATION = 5 * 60 * 1000; // 5 minutes

interface PermissionInStorage {
  permissions: Permissions;
  exp: number;
}

const getPermissionsFromUpstash = (key: string, value: string) =>
  fetch(`${Env.UPSTASH_REDIS_REST_URL}/hget/${key}/${value}`, {
    headers: {
      Authorization: `Bearer ${Env.UPSTASH_REDIS_REST_TOKEN}`,
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
    new Set(),
  );

  const getPermissions = useCallback(async () => {
    try {
      if (!email) throw new Error("No email found");
      Sentry.Native.captureMessage(email);
      // eslint-disable-next-line prefer-const
      let { exp: expCache, permissions } =
        getPermissionFromStorage(email, zoneId) || {};

      Sentry.Native.captureMessage(stringify({ exp: expCache, permissions }));

      if (permissions) setPermissions(permissions);

      if (!permissions || (expCache && isExpired(expCache))) {
        permissions = await getPermissionsFromUpstash(email, zoneId).then((p) =>
          p ? parse<Permissions>(p) : undefined,
        );
        Sentry.Native.captureMessage(stringify({ permissions }));
      }

      if (!permissions) {
        Sentry.Native.captureMessage("No permissions found");
        storage.delete(`${Store.PERMISSIONS}.${email}.${zoneId}`);
        setPermissions(new Set());
        return;
      }

      const d = new Date();
      const exp = d.setTime(d.getTime() + PERMISSIONS_DURATION);

      const newPermissions = stringify({
        permissions,
        exp,
      });
      Sentry.Native.captureMessage(newPermissions);

      storage.set(`${Store.PERMISSIONS}.${email}.${zoneId}`, newPermissions);

      setPermissions(permissions);
    } catch (err) {
      Sentry.Native.captureException(err);
    }
  }, [email, zoneId]);

  useEffect(() => {
    getPermissions();
  }, [getPermissions]);

  return { permission, getPermissions };
};

export default usePermissions;

const getPermissionFromStorage = (email: string, zoneId: string) => {
  const s = storage.getString(`${Store.PERMISSIONS}.${email}.${zoneId}`);
  if (!s) return undefined;
  return parse<PermissionInStorage>(s);
};
