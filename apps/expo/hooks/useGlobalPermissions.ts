import { useAppSelector } from "@hooks/redux";

const useGlobalPermissions = () => {
  const { globalPermissions } = useAppSelector((state) => state.auth);
  return globalPermissions;
};

export default useGlobalPermissions;
