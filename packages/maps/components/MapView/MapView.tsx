/* eslint-disable react/display-name */

import { forwardRef } from "react";
import { StyleSheet } from "react-native";
import RNMapView, { MapViewProps, PROVIDER_GOOGLE } from "react-native-maps";

const MapView = forwardRef<RNMapView, MapViewProps>(
  ({ children, ...props }, ref) => {
    return (
      <RNMapView
        {...props}
        ref={ref}
        provider={PROVIDER_GOOGLE}
        style={[styles.map, props.style]}
      >
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
