import ListForm from "./list-form";
import PriorityList from "./priority-list";
import TodayProcess from "./today-process";

export default function ListAddWrapper() {
  return (
    <div className="w-1/3 p-5 bg-white rounded-xl border border-gray-100 shadow-[4px_4px_12px_rgba(149,157,165,0.1)]">
      <ListForm />
      <PriorityList />
      <TodayProcess />
    </div>
  );
}
