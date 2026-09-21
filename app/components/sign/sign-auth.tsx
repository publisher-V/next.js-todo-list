import { ReactNode } from "react";

export default function SignAuth({ children }: { children: ReactNode }) {
  return <article className="flex flex-col gap-y-2 w-full">{children}</article>;
}
