import { create } from "zustand";
type dform = {
  editable: boolean;
  setEditable: (editable: boolean) => void;
};

export const useTreeDetailForm = create<dform>((set) => ({
  editable: false,
  setEditable: (editable) => set({ editable }),
}));
