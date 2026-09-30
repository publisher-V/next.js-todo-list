type TodoListSkeletonProps = {
  count?: number;
};

function TodoRowSkeleton() {
  return (
    <li className="relative flex gap-3 border-b border-gray-100 px-5 py-4 last:border-b-0 max-[481px]:px-1">
      <span className="h-4 w-4 shrink-0 animate-pulse rounded-ls bg-slate-200" />

      <div className="min-w-0 flex-1 space-y-2">
        <span className="block h-3.5 w-40 animate-pulse rounded-full bg-slate-200 max-[361px]:w-30" />
        <span className="block h-3 w-20 animate-pulse rounded-full bg-slate-100 max-[361px]:w-15" />
        <span className="block h-3 w-20 animate-pulse rounded-full bg-slate-100 max-[361px]:w-15" />
      </div>

      <span className="absolute right-6 top-2/4 h-4 w-4 shrink-0 animate-pulse rounded-full bg-slate-100 translate-y-[-50%]" />
      <span className="absolute right-0 top-2/4 h-4 w-4 shrink-0 animate-pulse rounded-full bg-slate-100 translate-y-[-50%]" />
    </li>
  );
}

export function TodoListSkeletonItems({ count = 5 }: TodoListSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <TodoRowSkeleton key={index} />
      ))}
    </>
  );
}

export function TodoCalendarSkeleton() {
  return (
    <div role="status" aria-label="캘린더를 불러오는 중" className="w-full bg-transparent p-5 pb-2 [--cell-size:--spacing(12)] max-[481px]:p-3">
      <div className="relative flex w-full flex-col gap-4 p-2 pb-4 rounded-lg border border-gray-100">
        <div className="flex h-(--cell-size) items-center justify-between gap-1 px-5 max-[361px]:px-2">
          <span className="w-5 h-5 animate-pulse rounded-md bg-slate-200 max-[361px]:rounded-xs max-[361px]:w-3 max-[361px]:h-3" />
          <div className="flex gap-x-2">
            <span className="inline-block h-7 w-28 animate-pulse rounded-sm bg-slate-200 max-[481px]:w-20 max-[361px]:w-17" />
            <span className="inline-block h-7 w-28 animate-pulse rounded-sm bg-slate-200 max-[481px]:w-20 max-[361px]:w-17" />
          </div>
          <span className="w-5 h-5 animate-pulse rounded-md bg-slate-200 max-[361px]:rounded-xs max-[361px]:w-3 max-[361px]:h-3" />
        </div>

        <div className="grid grid-cols-7 gap-y-2">
          {Array.from({ length: 7 }, (_, index) => (
            <div key={`weekday-${index}`} className="flex h-5 items-center justify-center">
              <span className="h-3 w-5 animate-pulse rounded-full bg-slate-100" />
            </div>
          ))}
          {Array.from({ length: 42 }, (_, index) => (
            <div key={`day-${index}`} className="flex items-center justify-center">
              <span className="size-(--cell-size) animate-pulse rounded-md bg-slate-100 max-[481px]:size-[calc(var(--cell-size)/1.4)] max-[361px]:size-[calc(var(--cell-size)/1.7)]" />
            </div>
          ))}
        </div>
      </div>
      <span className="sr-only">캘린더를 불러오는 중입니다.</span>
    </div>
  );
}

export function TodayProcessSkeleton() {
  return (
    <article aria-label="오늘의 할 일을 불러오는 중">
      <div className="flex min-h-47.5 w-full items-center justify-between gap-4 rounded-[22px] border border-gray-100 bg-white p-4 shadow-[0_8px_24px_rgba(71,91,126,0.06)] max-[413px]:flex-col">
        <div className="size-33 animate-pulse rounded-full border-8 border-slate-100 bg-slate-50 max-[1025px]:size-30" />
        <div className="w-[calc(100%-148px)] space-y-3 max-[1025px]:w-[calc(100%-120px)] max-[413px]:w-full">
          <div className="h-8 w-20 animate-pulse rounded-full bg-slate-200 max-[413px]:mx-auto" />
          <div className="h-3.5 w-44 animate-pulse rounded-full bg-slate-100 max-[413px]:mx-auto" />
        </div>
      </div>
    </article>
  );
}

export function TotalProcessSkeleton() {
  return (
    <div aria-label="전체 완료 현황을 불러오는 중" className="border-t border-gray-100 p-5">
      <span className="mb-2 block h-4 w-44 animate-pulse rounded-full bg-slate-100" />
      <div className="relative h-2 w-full max-w-100 animate-pulse rounded-full bg-slate-200" />
    </div>
  );
}
