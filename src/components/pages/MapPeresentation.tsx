import type { LatLngTuple } from 'leaflet';
import React, { useState } from 'react';
import { useMapEvents } from 'react-leaflet';

import type { Location } from '../../store/store';
import { useLocationStore } from '../../store/store';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  MapContainer,
  Marker,
  Popup as LeafletPopup,
} from '../shared';
import { Form } from './Form';

const Popup = ({ logo, name, type }: Omit<Location, 'position'>) => {
  return (
    <LeafletPopup closeButton>
      <img src={logo[0].dataURL} alt={name} className="h-12 w-full" />
      name: {name}
      <br />
      type: {type}
      <div className="flex">
        <Button variant="secondary">Close</Button>
        <Button>Edit</Button>
      </div>
    </LeafletPopup>
  );
};

const MapMarker = () => {
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
      {locations.length !== 0
        ? locations.map(({ logo, name, position, type }) => (
            <Marker key={name} position={position[0]}>
              <Popup logo={logo} name={name} type={type} />
            </Marker>
          ))
        : null}

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <DialogTitle className="mb-6 mt-0">Share location</DialogTitle>

          <Form />
        </DialogContent>
      </Dialog>
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
      <MapMarker />
    </MapContainer>
  );
};
