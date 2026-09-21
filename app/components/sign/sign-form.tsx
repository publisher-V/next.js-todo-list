"use client";

import { ReactNode } from "react";

interface Props {
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
}

export default function SignForm({ onSubmit, children }: Props) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-y-3 w-full">
      {children}
    </form>
  );
}
