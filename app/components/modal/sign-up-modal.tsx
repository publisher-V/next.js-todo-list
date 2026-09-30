"use client";

import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { useModalStore } from "@/app/store/modal-store";

interface Props {
  children: ReactNode;
}

export default function SignUpModal({ children }: Props) {
  const setIsClose = useModalStore((state) => state.setIsClose);

  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <section className="w-full h-full fixed inset-0 z-100000">
      <div onClick={setIsClose} className="absolute inset-0 bg-[rgba(0,0,0,0.3)]" />
      <div className="absolute top-1/2 left-1/2 w-[calc(100%-30px)] max-w-125 -translate-x-1/2 -translate-y-1/2 overflow-hidden bg-white rounded-xl p-10">
        <button onClick={setIsClose} className="absolute top-3 right-3 cursor-pointer transition-colors text-gray-600 hover:text-black">
          <X size={20} />
        </button>
        <div className="p-8 pr-4 rounded-xl border border-gray-200">
          <OverlayScrollbarsComponent
            className="h-[min(500px,calc(100dvh-2rem))]"
            options={{
              scrollbars: {
                theme: "os-theme-modal-custom",
                autoHide: "never",
              },
            }}
          >
            <div className="pr-8">{children}</div>
          </OverlayScrollbarsComponent>
        </div>
      </div>
    </section>,
    document.body,
  );
}
