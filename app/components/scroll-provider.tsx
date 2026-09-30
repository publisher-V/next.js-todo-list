"use client";

import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import "overlayscrollbars/overlayscrollbars.css";

interface Props {
  children: React.ReactNode;
}

export default function ScrollProvider({ children }: Props) {
  return (
    <OverlayScrollbarsComponent
      defer
      className="h-dvh"
      options={{
        scrollbars: {
          theme: "os-theme-custom",
          autoHide: "never",
        },
      }}
    >
      <div className="min-h-full">{children}</div>
    </OverlayScrollbarsComponent>
  );
}
