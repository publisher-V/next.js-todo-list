import { ReactNode } from "react";

export default function SignSection({ children }: { children: ReactNode }) {
  return <section className="flex flex-col items-center w-full max-w-100 mx-auto bg-white p-7 rounded-xl shadow-[8px_8px_24px_rgba(69,85,108,0.1)]">{children}</section>;
}
