import { useLocationStore } from '@store/';
import type { LatLngTuple } from 'leaflet';

import { FormGroup, MapContainer, Marker } from './shared';

const MapMarker = ({ positions }: { positions: LatLngTuple[] }) => {
  return (
    <div>
      {positions.map((position) => (
        <Marker key={position[0]} position={position} />
      ))}
    </div>
  );
};

export const PointMap = () => {
  const positions = useLocationStore((state) => state.position);

  return (
    <FormGroup label="Location on map">
      <MapContainer
        className="h-[20rem] w-[30rem]"
        center={positions[positions.length - 1]}
        zoom={13}
        scrollWheelZoom={false}
      >
        <MapMarker positions={positions} />
      </MapContainer>
    </FormGroup>
  );
};
