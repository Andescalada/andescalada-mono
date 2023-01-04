import { useAppDispatch } from "@hooks/redux";
import { autoLoginAuth0 } from "@store/auth";
import { useEffect } from "react";

const useAutoLogin = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(autoLoginAuth0());
  }, [dispatch]);
};

export default useAutoLogin;
