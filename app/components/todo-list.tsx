"use client";

import { useTabStore } from "../store/tab-store";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldContent, FieldTitle, FieldDescription } from "@/components/ui/field";
import { Todo, useTodoStore } from "../store/todo-store";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { AnimatePresence, motion } from "motion/react";

export default function TodoList() {
  const { lists, setLists, removeList } = useTodoStore();
  const { activeTab } = useTabStore();
  const completeList = useTodoStore((state) => state.toggleComplete);
  const [animatingTodo, setAnimatingTodo] = useState<{
    id: string | number;
    complete: boolean;
  } | null>(null);

  useEffect(() => {
    const savedLists = localStorage.getItem("todo-list");

    if (savedLists) {
      const parsedLists = JSON.parse(savedLists).map((list: Todo) => ({
        ...list,
        date: new Date(list.date),
      }));

      setLists(parsedLists);
    }
  }, [setLists]);

  const filteredLists = lists.filter((list) => (activeTab === "complete" ? list.complete : activeTab === "process" ? !list.complete : true));

  const sortedLists = [...filteredLists].sort((a, b) => {
    if (a.complete !== b.complete) {
      return a.complete ? 1 : -1;
    }

    if (!a.date) return 1;
    if (!b.date) return -1;

    return a.date.getTime() - b.date.getTime();
  });

  const completeHandler = (id: string | number) => {
    const list = lists.find((list) => list.id === id);

    if (!list) return;

    setAnimatingTodo({
      id,
      complete: !list.complete,
    });

    setTimeout(() => {
      completeList(id);
      setAnimatingTodo(null);
    }, 500);
  };

  return (
    <>
      {sortedLists.length === 0 ? (
        <AnimatePresence mode="wait" initial={false}>
          <motion.p key={activeTab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center justify-center w-full min-h-[150px] text-slate-400">
            {activeTab === "process" ? "진행중인 할 일이 없습니다." : activeTab === "complete" ? "완료된 할 일이 없습니다." : "할 일 리스트가 없습니다."}
          </motion.p>
        </AnimatePresence>
      ) : (
        <AnimatePresence mode="wait" initial={false}>
          <motion.ul key={activeTab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="px-5">
            {sortedLists.map((list) => {
              const priorityCss = list.priority === "높음" ? "before:bg-red-600" : list.priority === "보통" ? "before:bg-yellow-300" : list.priority === "낮음" ? "before:bg-(--primary)" : "";
              const formatedDate = list.date ? format(list.date, "yyyy.MM.dd", { locale: ko }) : "";

              const isAnimating = animatingTodo?.id === list.id;
              const isCompleted = isAnimating ? animatingTodo.complete : list.complete;

              return (
                <motion.li layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} key={list.id} className="relative py-4 border-b border-gray-100 last:border-b-0">
                  <Field orientation="horizontal">
                    <Checkbox id={`todo-${list.id}`} name={`todo-${list.id}`} checked={isCompleted} onCheckedChange={() => completeHandler(list.id)} />
                    <FieldContent className="gap-y-1 items-start">
                      <FieldTitle
                        className={`relative pl-4 text-[14px] transition-colors duration-300 before:absolute before:top-3/6 before:left-0 before:translate-y-[-50%] before:w-[10px] before:h-[10px] before:rounded-full after:absolute after:left:0 after:h-[1px] after:bg-slate-400 after:transition-[width] after:duration-300 ${isCompleted ? "after:w-[calc(100%-14px)] text-slate-300" : "after:w-0"} ${priorityCss}`}
                      >
                        {list.content}
                      </FieldTitle>
                      <FieldDescription
                        className={`relative pl-4 text-[13px] text-slate-400 transition-colors duration-300 before:absolute before:left:0 before:top-1/2 before:translate-y-[-50%] before:h-[1px] before:bg-slate-400 before:transition-[width] before:duration-300 ${isCompleted ? "before:w-[calc(100%-14px)] text-slate-300" : "before:w-0"}`}
                      >
                        {formatedDate}
                      </FieldDescription>
                    </FieldContent>
                  </Field>
                  <button onClick={() => removeList(list.id)} className="absolute top-1/2 right-0 translate-y-[-50%] cursor-pointer">
                    <X strokeWidth={3} size={16} className="text-slate-400 hover:text-(--foreground) transition-colors" />
                  </button>
                </motion.li>
              );
            })}
          </motion.ul>
        </AnimatePresence>
      )}
    </>
  );
}
