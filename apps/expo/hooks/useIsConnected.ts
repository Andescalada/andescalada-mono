import NetInfo, {
  NetInfoState,
  NetInfoSubscription,
} from "@react-native-community/netinfo";
import { useEffect, useRef, useState } from "react";

const useIsConnected = () => {
  const [isConnected, setIsConnected] = useState(true);

  const unsubscribe = useRef<NetInfoSubscription>();

  useEffect(() => {
    const handleConnectivityChange = (listener: NetInfoState) => {
      if (listener.isConnected !== null) setIsConnected(listener.isConnected);
    };

    unsubscribe.current = NetInfo.addEventListener(handleConnectivityChange);

    return () => {
      unsubscribe.current?.();
    };
  }, []);

  return isConnected;
};

export default useIsConnected;
