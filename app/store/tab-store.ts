import { create } from "zustand";

interface State {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

export const useTabStore = create<State>((set) => ({
  activeTab: "all",
  setActiveTab: (id) => set({ activeTab: id }),
}));
