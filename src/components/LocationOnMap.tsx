import { useLocationStore } from '@store/';
import type { LatLngTuple } from 'leaflet';

import { FormGroup, MapContainer, Marker } from '../ui';

const MapMarkers = ({ positions }: { positions: LatLngTuple[] }) => {
  return (
    <div>
      {positions.map((position) => (
        <Marker key={position[0]} position={position} />
      ))}
    </div>
  );
};

export const LocationOnMap = () => {
  const positions = useLocationStore((state) => state.positions);

  const lastPosition = positions[positions.length - 1];

  return (
    <FormGroup label="Location on map">
      <MapContainer
        className="h-[20rem] w-[30rem]"
        center={lastPosition}
        zoom={13}
        scrollWheelZoom={false}
      >
        <MapMarkers positions={positions} />
      </MapContainer>
    </FormGroup>
  );
};
