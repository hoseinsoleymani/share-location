import type { Location } from '@store/';
import { useLocationStore } from '@store/';
import type { LatLngTuple } from 'leaflet';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useMapEvents } from 'react-leaflet';

import { Button, MapContainer, Marker, Popup as LeafletPopup } from '../ui';
import { ShareLocationPopup } from './ShareLocationForm';

const LocationDetailsPopup = ({
  logo,
  name,
  type,
}: Omit<Location, 'positions'>) => {
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
      <ShareLocationPopup setShowPopup={setShowModal} showPopup={showModal} />
    </LeafletPopup>
  );
};

const MapMarkers = () => {
  const locations = useLocationStore((state) => state.savedLocations);

  const [showModal, setShowModal] = useState(false);
  const savePosition = useLocationStore((state) => state.savePosition);

  useMapEvents({
    dblclick(ev) {
      const { lat, lng } = ev.latlng;
      setShowModal(true);
      savePosition(lat, lng);
    },
  });

  return (
    <>
      {locations.map(({ logo, name, positions: position, type }) => (
        <Marker key={name} position={position[0]}>
          <LocationDetailsPopup logo={logo} name={name} type={type} />
        </Marker>
      ))}

      <ShareLocationPopup setShowPopup={setShowModal} showPopup={showModal} />
    </>
  );
};

export const MapPresentation = () => {
  const positions: LatLngTuple[] = useLocationStore((prev) => prev.positions);

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
