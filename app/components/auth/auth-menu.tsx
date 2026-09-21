"use client";

import { supabase } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import SignInButton from "./sign-in-button";
import SignOutButton from "./sign-out-button";
import { useEffect, useState } from "react";
import SignUpButton from "./sign-up-button";
import { useTodoStore } from "@/app/store/todo-store";

interface Todo {
  id: string | number;
  content: string;
  priority: string;
  date: Date;
  complete: boolean;
}

export default function AuthMenu() {
  const { setLists } = useTodoStore();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
    };

    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      alert(`로그아웃에 실패했습니다. : ${error}`);
      return;
    }

    const savedTodos = localStorage.getItem("todo-list");

    if (savedTodos) {
      const todos = JSON.parse(savedTodos).map((todo: Todo) => ({
        ...todo,
        date: new Date(todo.date),
      }));

      setLists(todos);
    } else {
      setLists([]);
    }
  };

  return (
    <div className="flex items-center justify-end w-full h-20 max-w-300 mx-auto">
      {user ? (
        <SignOutButton signOut={signOut} />
      ) : (
        <div className="flex gap-x-3">
          <SignInButton />
          <SignUpButton />
        </div>
      )}
    </div>
  );
}
