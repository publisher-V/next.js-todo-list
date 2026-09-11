import { create } from "zustand";

export interface Todo {
  id: number | string;
  content: string;
  priority: string;
  date: Date;
  complete: boolean;
}

interface State {
  lists: Todo[];
  setLists: (lists: Todo[]) => void;
  setList: (item: Todo) => void;
  removeList: (id: Todo["id"]) => void;
  toggleComplete: (id: Todo["id"]) => void;
}

export const useTodoStore = create<State>((set) => ({
  lists: [],
  setLists: (lists) => set({ lists }),
  setList: (item) =>
    set((state) => {
      const newLists = [...state.lists, item];
      localStorage.setItem("todo-list", JSON.stringify(newLists));

      return {
        lists: newLists,
      };
    }),
  removeList: (id) =>
    set((state) => {
      const newLists = state.lists.filter((list) => list.id !== id);
      localStorage.setItem("todo-list", JSON.stringify(newLists));

      return {
        lists: newLists,
      };
    }),
  toggleComplete: (id) =>
    set((state) => {
      const newLists = state.lists.map((list) => (list.id === id ? { ...list, complete: !list.complete } : list));

      localStorage.setItem("todo-list", JSON.stringify(newLists));

      return {
        lists: newLists,
      };
    }),
}));
