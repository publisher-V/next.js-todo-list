import TodoList from "./todo-list";
import TodoTab from "./todo-tab";
import TotalProcess from "./total-process";

export default function ListWrapper() {
  return (
    <div className="w-[calc(100%-400px-24px)] bg-white rounded-xl border border-gray-100 shadow-[4px_4px_12px_rgba(149,157,165,0.1)] max-[1025px]:w-[60%] max-[769px]:w-full">
      <TodoTab />
      <TodoList />
      <TotalProcess />
    </div>
  );
}
