import type { Location } from '@store/';
import { useLocationStore } from '@store/';
import type { LatLngTuple } from 'leaflet';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useMapEvents } from 'react-leaflet';

import { Button, MapContainer, Marker, Popup as LeafletPopup } from './shared';
import { ShareLocationPopup } from './ShareLocationForm';

const Popup = ({ logo, name, type }: Omit<Location, 'position'>) => {
  const [showModal, setShowModal] = useState(false);
  const { setValue } = useFormContext();

  const openModal = () => {
    setShowModal(true);
    setValue('name', name);
    setValue('type', type);
    setValue('logo', logo);
  };

  return (
    <LeafletPopup closeButton>
      <img src={logo[0].dataURL} alt={name} className="h-12 w-full" />
      name: {name}
      <br />
      type: {type}
      <div className="flex">
        <Button onClick={openModal}>Edit</Button>
      </div>
      <ShareLocationPopup setShowModal={setShowModal} showModal={showModal} />
    </LeafletPopup>
  );
};

const MapMarkers = () => {
  const [showModal, setShowModal] = useState(false);

  const savePosition = useLocationStore((state) => state.savePosition);

  const locations = useLocationStore((state) => state.locations);

  useMapEvents({
    dblclick(ev) {
      const { lat, lng } = ev.latlng;
      setShowModal(true);
      savePosition(lat, lng);
    },
  });

  return (
    <div>
      {locations.map(({ logo, name, position, type }) => (
        <Marker key={name} position={position[0]}>
          <Popup logo={logo} name={name} type={type} />
        </Marker>
      ))}

      <ShareLocationPopup setShowModal={setShowModal} showModal={showModal} />
    </div>
  );
};

export const MapPresentation = () => {
  const positions: LatLngTuple[] = useLocationStore((prev) => prev.position);

  return (
    <MapContainer
      className="h-screen w-screen"
      center={positions[positions.length - 1]}
      zoom={13}
      scrollWheelZoom={false}
    >
      <MapMarkers />
    </MapContainer>
  );
};
