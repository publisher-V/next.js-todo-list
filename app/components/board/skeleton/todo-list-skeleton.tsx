type TodoListSkeletonProps = {
  count?: number;
};

function TodoRowSkeleton() {
  return (
    <li className="flex items-center gap-3 border-b border-gray-100 px-5 py-4 last:border-b-0">
      <span className="h-4 w-4 shrink-0 animate-pulse rounded-sm bg-slate-200" />

      <div className="min-w-0 flex-1 space-y-2">
        <span className="block h-3.5 w-3/5 animate-pulse rounded-full bg-slate-200" />
        <span className="block h-3 w-1/4 animate-pulse rounded-full bg-slate-100" />
      </div>

      <span className="h-4 w-4 shrink-0 animate-pulse rounded-full bg-slate-100" />
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
