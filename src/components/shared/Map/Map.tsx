import 'leaflet/dist/leaflet.css';

import type { PropsWithChildren } from 'react';
import type { MarkerProps, PopupProps } from 'react-leaflet';
import { Marker as LeafletMarker, Popup as LeafletPopup } from 'react-leaflet';
import type { MapContainerProps } from 'react-leaflet/MapContainer';
import { MapContainer as LeafletMapContainer } from 'react-leaflet/MapContainer';
import { TileLayer } from 'react-leaflet/TileLayer';

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
