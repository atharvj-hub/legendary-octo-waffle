import { create } from 'zustand';

type LabState = 'upload' | 'processing' | 'result';

interface ClearwaterStore {
  labState: LabState;
  setLabState: (state: LabState) => void;
  resetLab: () => void;
}

export const useStore = create<ClearwaterStore>((set) => ({
  labState: 'upload',
  setLabState: (state) => set({ labState: state }),
  resetLab: () => set({ labState: 'upload' }),
}));
