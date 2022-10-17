import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { setIsOffline } from "@store/offline";

const useOfflineMode = () => {
  const isOfflineMode = useAppSelector((state) => state.offline.isOffline);

  const dispatch = useAppDispatch();

  const setIsOfflineMode = () => {
    dispatch(setIsOffline());
  };

  return { isOfflineMode, setIsOfflineMode };
};

export default useOfflineMode;
