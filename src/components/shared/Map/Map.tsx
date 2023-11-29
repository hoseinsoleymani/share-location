import {
  Marker as LeafletMarker,
  MarkerProps,
  Popup as LeafletPopup,
  PopupProps,
} from 'react-leaflet';
import {
  MapContainer as LeafletMapContainer,
  MapContainerProps,
} from 'react-leaflet/MapContainer';
import { TileLayer } from 'react-leaflet/TileLayer';
import 'leaflet/dist/leaflet.css';
import { PropsWithChildren, forwardRef } from 'react';
import { Popup as P } from 'leaflet';

interface MapProps extends MapContainerProps {}

export const MapContainer = ({
  children,
  ...props
}: PropsWithChildren<MapProps>) => {
  return (
    <LeafletMapContainer {...props}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {children}
    </LeafletMapContainer>
  );
};

export const Marker = ({
  children,
  ...props
}: PropsWithChildren<MarkerProps>) => {
  return <LeafletMarker {...props}>{children}</LeafletMarker>;
};

export const Popup = ({
  children,
  ...props
}: PropsWithChildren<PopupProps>) => {
  return <LeafletPopup {...props}>{children}</LeafletPopup>;
};
