import ListAddWrapper from "./list-add-wrapper";
import ListWrapper from "./list-wrapper";
import TodoTitleArea from "./todo-title-area";

export default function TodoContainer() {
  return (
    <div className="w-full max-w-300 mx-auto">
      <TodoTitleArea />
      <section className="flex items-start gap-x-6 max-[769px]:flex-col max-[769px]:gap-x-0 gap-y-6">
        <ListWrapper />
        <ListAddWrapper />
      </section>
    </div>
  );
}
