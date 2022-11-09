import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { activateOffline, setIsOffline } from "@store/offline";

const useOfflineMode = () => {
  const isOfflineMode = useAppSelector((state) => state.offline.isOffline);

  const dispatch = useAppDispatch();

  const setIsOfflineMode = () => {
    dispatch(setIsOffline());
  };
  const activateOfflineMode = () => {
    dispatch(activateOffline());
  };

  return { isOfflineMode, setIsOfflineMode, activateOfflineMode };
};

export default useOfflineMode;
