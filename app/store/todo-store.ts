import { create } from "zustand";
import { supabase } from "@/lib/supabase/client";
import { completeTodo, createTodo, deleteTodo, getTodos, migrateTodos } from "../actions/todos-action";

export interface Todo {
  id: string | number;
  content: string;
  priority: string;
  date: Date;
  complete: boolean;
}

interface State {
  lists: Todo[];
  isLoading: boolean;
  error: {
    state: boolean;
    message: string | null;
  };
  setLists: (lists: Todo[]) => void;
  setList: (item: Todo) => void;
  removeList: (id: Todo["id"]) => void;
  toggleComplete: (id: Todo["id"], complete: Todo["complete"]) => void;
  loadTodos: () => Promise<void>;
}

export const useTodoStore = create<State>((set) => ({
  lists: [],
  isLoading: true,
  error: {
    state: false,
    message: null,
  },
  setLists: (lists) => set({ lists }),
  setList: async (item) => {
    const previousLists = useTodoStore.getState().lists;
    const nextLists = [...previousLists, item];

    set({ lists: nextLists });

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        await createTodo(item);
      } else {
        localStorage.setItem("todo-list", JSON.stringify(nextLists));
      }
    } catch (error) {
      set({ lists: previousLists });
      console.error(`할 일 추가 실패 : ${error}`);
    }
  },
  removeList: async (id) => {
    const previousLists = useTodoStore.getState().lists;
    const nextLists = previousLists.filter((list) => list.id !== id);

    set({ lists: nextLists });
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        await deleteTodo(id);
      } else {
        localStorage.setItem("todo-list", JSON.stringify(nextLists));
      }
    } catch (error) {
      set({ lists: previousLists });
      console.error(`할 일 추가 실패 : ${error}`);
    }
  },
  toggleComplete: async (id) => {
    const previousLists = useTodoStore.getState().lists;
    const target = previousLists.find((list) => list.id === id);

    if (!target) return;

    const complete = !target?.complete;

    const nextLists = previousLists.map((list) => (list.id === id ? { ...list, complete } : list));

    set({ lists: nextLists });

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        await completeTodo(id, complete);
      } else {
        localStorage.setItem("todo-list", JSON.stringify(nextLists));
      }
    } catch (error) {
      set({ lists: previousLists });
      console.error(`할 일 추가 실패 : ${error}`);
    }
  },
  loadTodos: async () => {
    set({
      isLoading: true,
      error: {
        state: false,
        message: null,
      },
    });

    try {
      const savedLists = localStorage.getItem("todo-list");

      const localTodos: Todo[] = savedLists
        ? JSON.parse(savedLists).map((list: Todo) => ({
            ...list,
            date: new Date(list.date),
          }))
        : [];

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        set({ lists: localTodos });
        return;
      }

      if (localTodos.length > 0) {
        const result = await migrateTodos(localTodos);

        if (result.isLoggedIn) {
          localStorage.removeItem("todo-list");
        }
      }

      const todos = await getTodos();

      set({
        lists: todos.map((todo) => ({
          ...todo,
          date: new Date(todo.date),
        })),
      });
    } catch (error) {
      set({
        error: {
          state: true,
          message: error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.",
        },
      });
    } finally {
      set({ isLoading: false });
    }
  },
}));
