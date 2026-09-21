"use server";

import { createClient } from "@/lib/supabase/server";

interface Todo {
  id: string | number;
  content: string;
  priority: string;
  date: Date;
  complete: boolean;
}

export async function migrateTodos(todos: Todo[]) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { isLoggedIn: false };
  }

  const { error } = await supabase.from("Todos").insert(
    todos.map((todo) => ({
      user_id: user.id,
      id: todo.id,
      content: todo.content,
      priority: todo.priority,
      date: todo.date,
      complete: todo.complete,
    })),
  );

  if (error) {
    throw new Error(`${error.code} : ${error.message}`);
  }

  return { isLoggedIn: true };
}

export async function createTodo(todo: Todo) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { isLoggedIn: false };
  }

  const { error } = await supabase.from("Todos").insert({
    user_id: user.id,
    id: todo.id,
    content: todo.content,
    priority: todo.priority,
    date: todo.date,
    complete: todo.complete,
  });

  if (error) {
    throw new Error(`${error.code} : ${error.message}`);
  }

  return { isLoggedIn: true };
}

export async function deleteTodo(id: Todo["id"]) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { isLoggedIn: false };
  }

  const { error } = await supabase.from("Todos").delete().eq("id", id);

  if (error) {
    throw new Error(`${error.code} : ${error.message}`);
  }

  return { isLOggedIn: true };
}

export async function completeTodo(id: Todo["id"], complete: Todo["complete"]) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { isLoggedIn: false };
  }

  const { error } = await supabase
    .from("Todos")
    .update({
      complete,
    })
    .eq("id", id);

  if (error) {
    throw new Error(`${error.code} : ${error.message}`);
  }

  return { isLoggedIn: true, success: true };
}

export async function getTodos() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return [];
  }

  const { data, error } = await supabase.from("Todos").select("id, content, priority, date, complete").eq("user_id", user.id).order("date", { ascending: true });

  if (error) {
    throw new Error(`${error.code} : ${error.message}`);
  }

  return data;
}
