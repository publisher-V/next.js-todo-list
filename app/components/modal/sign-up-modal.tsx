"use client";

import { ReactNode } from "react";
import { createPortal } from "react-dom";

interface Props {
  onClose: () => void;
  children: ReactNode;
}

export default function SignUpModal({ onClose, children }: Props) {
  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <section className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full h-full z-999">
      <div onClick={onClose} className="absolute w-full h-full top-0 left-0 bg-[rgba(0,0,0,0.3)]"></div>
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white max-w-[500px] max-h-[500px] overflow-scroll">{children}</div>
    </section>,
    document.body,
  );
}
