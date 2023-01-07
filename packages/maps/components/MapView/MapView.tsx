/* eslint-disable react/display-name */

import { forwardRef, useCallback, useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import RNMapView, {
  Details,
  MapViewProps,
  Marker,
  PROVIDER_GOOGLE,
  Region,
} from "react-native-maps";

// Invisible marker added to fix complex bug with a fatal crash on iOS
// https://github.com/react-native-maps/react-native-maps/issues/4581

const MapView = forwardRef<RNMapView, MapViewProps>(
  ({ children, onRegionChangeComplete, ...props }, ref) => {
    const [visibleRegion, setVisibleRegion] = useState<Region>();

    const handleRegionChange = useCallback(
      (region: Region, details: Details) => {
        setVisibleRegion(region);
        if (onRegionChangeComplete) onRegionChangeComplete(region, details);
      },
      [onRegionChangeComplete],
    );

    return (
      <RNMapView
        {...props}
        ref={ref}
        provider={PROVIDER_GOOGLE}
        style={[styles.map, props.style]}
        onRegionChangeComplete={handleRegionChange}
      >
        {visibleRegion && Platform.OS === "ios" && (
          <Marker coordinate={visibleRegion}>
            <View />
          </Marker>
        )}
        {children}
      </RNMapView>
    );
  },
);

export default MapView;

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
