import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import TreeWrapper from "../components/treelist/TreeWrapper";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";

export function Resizable({ children }: { children: ReactNode }) {
  return (
    <ResizablePanelGroup direction="horizontal" className="h-full w-full rounded-lg border">
      <ResizablePanel defaultSize={20}>
        <TreeWrapper></TreeWrapper>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={80}>{children}</ResizablePanel>
      {/* <ResizablePanel defaultSize={80}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={10}>
            <div className="flex h-full items-center justify-start gap-3 p-6">
              <Button variant="secondary">Edit</Button>
              <Button variant="secondary">Add Child</Button>
              <Button className="bg-my-gradient-1">Delete</Button>
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={90}>
            {children}
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel> */}
    </ResizablePanelGroup>
  );
}
