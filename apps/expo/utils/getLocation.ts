import * as Location from "expo-location";

const getLocation = async (options?: {
  fresh?: boolean;
}): Promise<Location.LocationObject> => {
  const { status } = await Location.requestForegroundPermissionsAsync();

  if (status === Location.PermissionStatus.GRANTED) {
    let location = await Location.getLastKnownPositionAsync({});
    if (location && !options?.fresh) {
      return location;
    }
    const enabled = await Location.hasServicesEnabledAsync();
    if (enabled) {
      location = await Location.getCurrentPositionAsync({});
      return location;
    }
    throw new Error("GPS not active");
  } else {
    throw new Error("Location not granted");
  }
};

export const isLocationAllowed = async (): Promise<boolean> => {
  const { status } = await Location.requestForegroundPermissionsAsync();

  if (status === Location.PermissionStatus.GRANTED) {
    const enabled = await Location.hasServicesEnabledAsync();
    if (enabled) return true;
    throw new Error("GPS not active");
  }
  throw new Error("Location not granted");
};

export default getLocation;
