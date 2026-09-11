import ListAddWrapper from "./list-add-wrapper";
import ListWrapper from "./list-wrapper";
import TodoTitleArea from "./toto-title-area";

export default function TodoContainer() {
  return (
    <div className="w-full max-w-[1200px] mx-auto">
      <TodoTitleArea />
      <section className="flex items-start gap-x-6">
        <ListWrapper />
        <ListAddWrapper />
      </section>
    </div>
  );
}
