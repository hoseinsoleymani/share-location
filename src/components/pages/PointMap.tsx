import React from 'react';
import { useLocationStore } from '../../store/store';
import { MapContainer } from '../shared';
import { Marker } from '../shared';
import { LatLngTuple } from 'leaflet';
import { FormGroup } from '../shared/FormGroup/FormGroup';

export const PointMap = () => {
  const positions = useLocationStore((state) => state.position);

  return (
    <FormGroup label="Location on map">
      <MapContainer
        className="w-[30rem] h-[20rem]"
        center={positions[positions.length - 1]}
        zoom={13}
        scrollWheelZoom={false}
      >
        <MapMarker positions={positions} />
      </MapContainer>
    </FormGroup>
  );
};

const MapMarker = ({ positions }: { positions: LatLngTuple[] }) => {
  return (
    <div>
      {positions.map((position) => (
        <Marker key={position[0]} position={position} />
      ))}
    </div>
  );
};
