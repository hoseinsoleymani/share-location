import type { LatLngTuple } from 'leaflet';
import { create } from 'zustand';

interface File {
  dataURL: string;
}

export interface Location {
  name: string;
  positions: LatLngTuple[];
  type: string;
  logo: File[];
}

interface LocationState extends Pick<Location, 'positions'> {
  savedLocations: Location[];
  saveLocation: (logo: File[], name: string, type: string) => void;
  savePosition: (lat: number, lng: number) => void;
  removeCurrentPosition: () => void;
}

export const useLocationStore = create<LocationState>((set) => ({
  positions: [[51.505, -0.09]],
  savedLocations: [],
  saveLocation: (logo, name, type) =>
    set(({ savedLocations, positions }) => ({
      savedLocations: [
        ...savedLocations,
        { logo, name, positions: [positions[positions.length - 1]], type },
      ],
    })),
  savePosition: (lat, lng) =>
    set((state) => ({ positions: [...state.positions, [lat, lng]] })),
  removeCurrentPosition: () =>
    set((state) => {
      const positions = [...state.positions];
      positions.pop();

      return { positions };
    }),
}));
