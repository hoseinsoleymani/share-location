import { LatLngTuple } from 'leaflet';
import { ImageListType } from 'react-images-uploading';
import { create } from 'zustand';

interface Location {
  name: string;
  position: LatLngTuple[];
  type: string;
  logo: any[];
}

interface LocationState extends Pick<Location, 'position'> {
  locations: Location[];
  saveLocation: (logo: never[], name: string, type: string) => void;
  savePosition: (lat: number, lng: number) => void;
}

export const useLocationStore = create<LocationState>((set) => ({
  position: [[51.505, -0.09]],
  locations: [],
  saveLocation: (logo, name, type) =>
    set(({ locations, position }) => ({
      locations: [
        ...locations,
        { logo, name, position: [position[position.length - 1]], type },
      ],
    })),
  savePosition: (lat, lng) =>
    set((state) => ({ position: [...state.position, [lat, lng]] })),
}));
