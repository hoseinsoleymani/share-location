import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  MapContainer,
  Marker,
  Popup,
} from '../shared';
import { useLocationStore } from '../../store/store';
import { LatLngTuple } from 'leaflet';
import { useMapEvents } from 'react-leaflet';
import { Form } from './Form';

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
              <Popup closeButton>
                <img src={logo[0].dataURL} className="w-full h-12" />
                name: {name}
                <br />
                type: {type}
                <div className="flex">
                  <Button variant="secondary">Close</Button>
                  <Button>Edit</Button>
                </div>
              </Popup>
            </Marker>
          ))
        : null}

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <DialogTitle className="mt-0 mb-6">Share location</DialogTitle>

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
      className="w-screen h-screen"
      center={positions[positions?.length - 1]}
      zoom={13}
      scrollWheelZoom={false}
    >
      <MapMarker />
    </MapContainer>
  );
};
