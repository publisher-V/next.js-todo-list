"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import ContentTitle from "./content-title";
import { useTodoStore } from "../store/todo-store";

const items = [
  { label: "높음", value: "높음" },
  { label: "보통", value: "보통" },
  { label: "낮음", value: "낮음" },
];

export default function ListForm() {
  const { setList } = useTodoStore();

  const [date, setDate] = useState<Date>();
  const [open, setOpen] = useState(false);
  const [validate, setValidate] = useState({
    content: false,
    priority: false,
    date: false,
  });
  const [content, setContent] = useState("");
  const [priority, setPrioRity] = useState("");

  const dateHandler = (date: Date | undefined) => {
    setDate(date);
    setOpen(false);
  };

  const listAddHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newValidate = {
      content: content.trim(),
      priority: priority,
      date: date,
    };

    setValidate(newValidate);

    if (!newValidate.content || !newValidate.priority || !newValidate.date) {
      return;
    }

    if (!date) return;

    setList({
      id: uuidv4(),
      content: content.trim(),
      priority,
      date,
      complete: false,
    });

    setContent("");
    setPrioRity("");
    setDate(undefined);
  };

  const contentChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
    setValidate((prev) => ({ ...prev, content: true }));
  };

  return (
    <div className="mb-6">
      <ContentTitle title="할 일 추가하기" />
      <form onSubmit={listAddHandler} className="flex flex-col gap-y-3">
        <div>
          <Input
            id="content"
            placeholder="할 일을 입력하세요."
            className="h-[35px] bg-(--background) border border-gray-200 rounded-[10px] font-medium text-[13px] focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-gray-200"
            value={content}
            onChange={contentChangeHandler}
          />
          {validate.content && <p className="mt-1 text-[12px] text-red-400 font-medium">할 일을 입력해주세요.</p>}
        </div>
        <div className="flex gap-x-2">
          <div className="w-1/2">
            <Select id="priority" value={priority} onValueChange={(value) => setPrioRity(value ?? "")}>
              <SelectTrigger className="w-full !h-[35px] box-border bg-(--background) border border-gray-200 rounded-[10px] font-medium text-[13px] text-(--muted-foreground)">
                <SelectValue placeholder="우선순위" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>우선순위</SelectLabel>
                  {items.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {validate.priority && <p className="mt-1 text-[12px] text-red-400 font-medium">우선순위를 선택해주세요.</p>}
          </div>
          <div className="w-1/2">
            <Popover onOpenChange={setOpen} open={open}>
              <PopoverTrigger
                render={
                  <Button
                    variant={"outline"}
                    data-empty={!date}
                    className="w-full h-[35px] justify-between text-left text-[13px] text-(--muted-foreground) font-medium border-gray-200 rounded-[10px] data-[empty=true]:text-muted-foreground !bg-(--background) hover:text-(--muted-foreground)"
                  >
                    {date ? format(date, "PPP", { locale: ko }) : <span>날짜를 선택하세요.</span>}
                    <ChevronDownIcon data-icon="inline-end" />
                  </Button>
                }
              />
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar id="date" mode="single" selected={date} onSelect={dateHandler} defaultMonth={date} locale={ko} disabled={{ before: new Date() }} />
              </PopoverContent>
            </Popover>
            {validate.date && <p className="mt-1 text-[12px] text-red-400 font-medium">날짜를 선택해주세요.</p>}
          </div>
        </div>
        <button className="h-[35px] bg-(--primary) text-white rounded-[10px] cursor-pointer transition-colors text-[14px] hover:bg-[#4573e9]">추가하기</button>
      </form>
    </div>
  );
}
