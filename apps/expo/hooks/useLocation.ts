import getLocation from "@utils/getLocation";
import * as Location from "expo-location";
import { DependencyList, useCallback, useEffect, useState } from "react";

const useLocation = (
  options?: {
    fresh?: boolean;
    skip?: boolean;
  },
  deps?: DependencyList,
) => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState<Error | null>(null);
  const [isError, setIsError] = useState(false);

  const requestLocation = useCallback(async (ops?: { fresh?: boolean }) => {
    setIsLoading(true);
    setIsError(false);
    try {
      const l = await getLocation(ops);
      setLocation(l);
    } catch (e) {
      const err = e as Error;
      setError(err);
      setIsError(true);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!options?.skip) requestLocation({ fresh: options?.fresh });
  }, [requestLocation, deps, options?.skip, options?.fresh]);

  return {
    error,
    location,
    reRequest: requestLocation,
    isLoading,
    isError,
  };
};

export default useLocation;
