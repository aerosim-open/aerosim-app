import { create } from 'zustand';
import { Object3D } from 'three';

interface ThreeState {
  model: Object3D | null;
  setModel: (model: Object3D | null) => void;
}

export const useThreeStore = create<ThreeState>((set) => ({
  model: null,
  setModel: (model) => set({ model }),
}));
