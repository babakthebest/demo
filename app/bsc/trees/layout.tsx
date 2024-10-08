import React, { ReactNode } from "react";
import { Resizable } from "../components/resizable";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="h-full w-full">
      <Resizable nodeLink="bsc/trees">{children}</Resizable>
    </div>
  );
}
