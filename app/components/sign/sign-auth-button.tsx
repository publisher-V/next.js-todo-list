import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  onClick?: () => void;
}

export default function SignAuthButton({ children, ...props }: Props) {
  return (
    <button {...props} className="flex justify-center items-center w-full h-10 px-2 border border-slate-200 rounded-md outline-0 bg-white text-sm text-slate-600 cursor-pointer">
      {children}
    </button>
  );
}
