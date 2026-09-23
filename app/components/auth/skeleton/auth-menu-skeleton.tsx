export default function AuthMenuSkeleton() {
  return (
    <div role="status" aria-label="로그인 상태를 확인하는 중" className="flex items-center justify-end gap-x-3">
      <span className="size-10 animate-pulse rounded-full bg-slate-200" />
      <span className="size-10 animate-pulse rounded-full bg-slate-200" />
      <span className="sr-only">로그인 상태를 확인하는 중입니다.</span>
    </div>
  );
}
