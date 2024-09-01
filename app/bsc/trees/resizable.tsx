import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import TreeWrapper from "../components/treelist/TreeWrapper";
import { ReactNode } from "react";

export function Resizable({ children }: { children: ReactNode }) {
  return (
    <ResizablePanelGroup direction="horizontal" className="h-full w-full rounded-lg border">
      <ResizablePanel defaultSize={20}>
        {/* <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">One</span>
        </div> */}
        <TreeWrapper></TreeWrapper>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={80}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={10}>
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Two</span>
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={90}>
            {children}
            {/* <div className="h-64 w-64 rounded-xl border border-white/20 bg-white bg-opacity-10 p-6 text-slate-50 shadow-lg backdrop-blur-md">
              {" "}
              kkkkkkkkkkkkkkkkkk
            </div> */}
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
