import { create } from "zustand";
import { supabase } from "@/lib/supabase/client";
import { completeTodo, createTodo, deleteTodo } from "../actions/todos-action";

export interface Todo {
  id: string | number;
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
  toggleComplete: (id: Todo["id"], complete: Todo["complete"]) => void;
}

export const useTodoStore = create<State>((set) => ({
  lists: [],
  setLists: (lists) => set({ lists }),
  setList: async (item) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      await createTodo(item);
    } else {
      const newLists = [...useTodoStore.getState().lists, item];
      localStorage.setItem("todo-list", JSON.stringify(newLists));
    }

    set((state) => ({
      lists: [...state.lists, item],
    }));
  },
  removeList: async (id) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const newLists = useTodoStore.getState().lists.filter((list) => list.id !== id);

    if (user) {
      await deleteTodo(id);
    } else {
      localStorage.setItem("todo-list", JSON.stringify(newLists));
    }

    set({ lists: newLists });
  },
  toggleComplete: async (id) => {
    const lists = useTodoStore.getState().lists;
    const target = lists.find((list) => list.id === id);

    const complete = !target?.complete;

    if (!target) return;
    const newLists = lists.map((list) => (list.id === id ? { ...list, complete } : list));

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      await completeTodo(id, complete);
    } else {
      localStorage.setItem("todo-list", JSON.stringify(newLists));
    }

    set({
      lists: newLists,
    });
  },
}));
