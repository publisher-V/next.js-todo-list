import { ReactNode } from "react";

export default function SignFormButton({ children }: { children: ReactNode }) {
  return <button className="w-full h-[40px] mt-3 bg-(--primary) rounded-md text-white cursor-pointer transition-colors hover:bg-[#4573e9]">{children}</button>;
}
