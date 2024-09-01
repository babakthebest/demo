import React, { ReactNode } from "react";
import { Resizable } from "./resizable";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="h-full w-full">
      <Resizable>{children}</Resizable>
    </div>
  );
}
