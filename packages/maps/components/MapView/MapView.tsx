import RNMapView, { MapViewProps, PROVIDER_GOOGLE } from "react-native-maps";

const MapView = ({ children, ...props }: MapViewProps) => {
  return (
    <RNMapView {...props} provider={PROVIDER_GOOGLE}>
      {children}
    </RNMapView>
  );
};

export default MapView;
