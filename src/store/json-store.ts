import { create } from 'zustand';

interface JsonState {
  jsonData: any;
  setJsonData: (data: any) => void;
}

export const useJsonStore = create<JsonState>((set) => ({
  jsonData: null,
  setJsonData: (data) => set({ jsonData: data }),
}));
