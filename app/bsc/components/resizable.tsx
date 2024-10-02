import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import TreeWrapper from "../components/treelist/TreeWrapper";
import { ReactNode } from "react";

export function Resizable({ children, nodeLink }: { children: ReactNode; nodeLink: string }) {
  return (
    <ResizablePanelGroup direction="horizontal" className="h-full w-full rounded-lg border">
      <ResizablePanel defaultSize={20}>
        <TreeWrapper nodeLink={nodeLink}></TreeWrapper>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={80}>{children}</ResizablePanel>
    </ResizablePanelGroup>
  );
}
