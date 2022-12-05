import NetInfo, { NetInfoSubscription } from "@react-native-community/netinfo";
import { useEffect, useRef, useState } from "react";

const useIsOnline = () => {
  const [isOnline, setIsOnline] = useState(true);

  const unsubscribe = useRef<NetInfoSubscription>();

  useEffect(() => {
    const handleConnectivityChange = (event: any) => {
      setIsOnline(event.isInternetReachable);
    };

    unsubscribe.current = NetInfo.addEventListener(handleConnectivityChange);

    return () => {
      unsubscribe.current?.();
    };
  }, []);

  return isOnline;
};

export default useIsOnline;
