import { create } from "zustand";

interface State {
  openModal: Record<string, boolean>;
  setIsOpen: (modalType: string) => void;
  setIsClose: () => void;
}

export const useModalStore = create<State>((set) => ({
  openModal: {},
  setIsOpen: (modalType: string) =>
    set((state) => ({
      openModal: {
        ...state.openModal,
        [modalType]: true,
      },
    })),
  setIsClose: () => set({ openModal: {} }),
}));
