import {
  getTrackingPermissionsAsync,
  requestTrackingPermissionsAsync,
} from "expo-tracking-transparency";

const getTrackingPermission = async (): Promise<boolean> => {
  const { status } = await requestTrackingPermissionsAsync();
  return status === "granted";
};

export const getPermissionStatus = async () => {
  const { granted } = await getTrackingPermissionsAsync();
  return granted;
};
export default getTrackingPermission;
