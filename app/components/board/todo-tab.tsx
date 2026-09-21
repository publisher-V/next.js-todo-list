"use client";

import { useTabStore } from "../../store/tab-store";

const tabs = [
  {
    id: "all",
    title: "전체",
  },
  {
    id: "process",
    title: "진행중",
  },
  {
    id: "complete",
    title: "완료",
  },
];

export default function TodoTab() {
  const { activeTab, setActiveTab } = useTabStore();

  return (
    <ul className="flex flex-wrap gap-3 p-5 border-b border-gray-100 max-[769px]:gap-1.5">
      {tabs.map((tab) => (
        <li key={tab.id}>
          <button
            onClick={() => setActiveTab(tab.id)}
            className={`min-w-20 min-h-8.75 cursor-pointer rounded-[20px] text-[14px] font-semibold transition-colors max-[769px]:min-w-17.5 max-[769px]:min-h-7.5 max-[769px]:text-[13px] ${activeTab === tab.id ? "bg-primary text-white" : "bg-background text-gray-600"}`}
          >
            {tab.title}
          </button>
        </li>
      ))}
    </ul>
  );
}
