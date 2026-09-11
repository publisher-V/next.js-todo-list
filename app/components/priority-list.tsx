import ContentTitle from "./content-title";

const priority = [
  {
    value: "high",
    title: "높음",
    description: "지금 당장 해야 하는 일",
    color: "before:bg-red-600",
  },
  {
    value: "middle",
    title: "보통",
    description: "일반적인 우선순위",
    color: "before:bg-yellow-300",
  },
  {
    value: "low",
    title: "낮음",
    description: "여유가 있을 때 해도 되는 일",
    color: "before:bg-(--primary)",
  },
];

export default function PriorityList() {
  return (
    <div className="mb-6">
      <ContentTitle title="우선순위" />
      <ul className="flex flex-col gap-y-2">
        {priority.map((list) => (
          <li key={list.value} className={`relative pl-5 before:absolute before:w-[10px] before:h-[10px] before:rounded-full before:top-2/4 before:left-0 before:translate-y-[-50%] ${list.color}`}>
            <h4 className="font-medium text-[15px]">{list.title}</h4>
            <p className="text-[14px] text-slate-400">{list.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
