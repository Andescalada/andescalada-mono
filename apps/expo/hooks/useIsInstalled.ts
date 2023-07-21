import { useEffect, useState } from "react";
import { Linking, Platform } from "react-native";
import Share from "react-native-share";

const useIsInstalled = (name: string) => {
  const [inInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    if (Platform.OS === "ios") {
      Linking.canOpenURL(`${name}://`).then((val) => setIsInstalled(val));
    } else {
      Share.isPackageInstalled(`com.${name}.android`).then(
        ({ isInstalled }) => {
          setIsInstalled(isInstalled);
        },
      );
    }
  }, []);

  return { inInstalled };
};

export default useIsInstalled;
