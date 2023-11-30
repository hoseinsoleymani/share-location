import type { LatLngTuple } from 'leaflet';
import { create } from 'zustand';

interface File {
  dataURL: string;
}

export interface Location {
  name: string;
  position: LatLngTuple[];
  type: string;
  logo: File[];
}

interface LocationState extends Pick<Location, 'position'> {
  locations: Location[];
  saveLocation: (logo: File[], name: string, type: string) => void;
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
