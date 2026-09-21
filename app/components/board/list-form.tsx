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
import { useTodoStore } from "../../store/todo-store";

const items = [
  { label: "높음", value: "높음" },
  { label: "보통", value: "보통" },
  { label: "낮음", value: "낮음" },
];

export default function ListForm() {
  const { setList } = useTodoStore();

  const [date, setDate] = useState<Date>();
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const [priority, setPriority] = useState("");
  const [validate, setValidate] = useState({
    content_validate: false,
    priority_validate: false,
    date_validate: false,
  });
  const [validateSentence, setValidateSentence] = useState(false);

  const listAddHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValidateSentence(true);

    if (!validate.content_validate || !validate.priority_validate || !validate.date_validate) return;

    if (!date) return;

    setList({
      id: uuidv4(),
      content: content.trim(),
      priority,
      date,
      complete: false,
    });

    setContent("");
    setPriority("");
    setDate(undefined);
  };

  const contentChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
    setValidate((prev) => ({
      ...prev,
      content_validate: e.target.value !== "",
    }));
  };

  const priorityChangeHandler = (value: string) => {
    setPriority(value);
    setValidate((prev) => ({
      ...prev,
      priority_validate: value !== "",
    }));
  };

  const dateChangeHandler = (date: Date | undefined) => {
    setDate(date);
    setOpen(false);
    setValidate((prev) => ({
      ...prev,
      date_validate: date !== undefined,
    }));
  };

  return (
    <div className="mb-6">
      <ContentTitle title="할 일 추가하기" />
      <form onSubmit={listAddHandler} className="flex flex-col gap-y-3">
        <div>
          <Input
            id="content"
            placeholder="할 일을 입력하세요."
            className="h-8.75 bg-background border border-gray-200 rounded-[10px] font-medium text-[13px] focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-gray-200"
            value={content}
            onChange={contentChangeHandler}
          />
          {validateSentence && !validate.content_validate && <p className="mt-1 text-[12px] text-red-400 font-medium">할 일을 입력해주세요.</p>}
        </div>
        <div className="flex gap-x-2">
          <div className="w-[calc(50%-4px)]">
            <Select id="priority" value={priority} onValueChange={(value) => priorityChangeHandler(value ?? "")}>
              <SelectTrigger className="flex! items-center w-full h-8.75! box-border bg-background border border-gray-200 rounded-[10px] font-medium text-[13px] text-muted-foreground">
                <SelectValue placeholder="우선순위" className="inline-block! w-[calc(100%-15px)] truncate whitespace-nowrap" />
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
            {validateSentence && !validate.priority_validate && <p className="mt-1 text-[12px] text-red-400 font-medium overflow-hidden">우선순위를 선택해주세요.</p>}
          </div>
          <div className="w-[calc(50%-4px)]">
            <Popover onOpenChange={setOpen} open={open}>
              <PopoverTrigger
                render={
                  <Button
                    variant={"outline"}
                    data-empty={!date}
                    className="flex! items-center w-full h-8.75 justify-between text-left text-[13px] text-muted-foreground font-medium border-gray-200 rounded-[10px] data-[empty=true]:text-muted-foreground bg-background! hover:text-muted-foreground"
                  >
                    {date ? (
                      <span className="inline-block w-[calc(100%-15px)] truncate whitespace-nowrap">{format(date, "PPP", { locale: ko })}</span>
                    ) : (
                      <span className="inline-block w-[calc(100%-15px)] truncate whitespace-nowrap">날짜를 선택하세요.</span>
                    )}
                    <ChevronDownIcon data-icon="inline-end" className="inline-block" />
                  </Button>
                }
              />
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar id="date" mode="single" selected={date} onSelect={(date) => dateChangeHandler(date)} defaultMonth={date} locale={ko} disabled={{ before: new Date() }} />
              </PopoverContent>
            </Popover>
            {validateSentence && !validate.date_validate && <p className="mt-1 text-[12px] text-red-400 font-medium">날짜를 선택해주세요.</p>}
          </div>
        </div>
        <button className="h-8.75 bg-primary text-white rounded-[10px] cursor-pointer transition-colors text-[14px] hover:bg-[#4573e9]">추가하기</button>
      </form>
    </div>
  );
}
