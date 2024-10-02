import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import Link from "next/link";

import { ReactNode } from "react";

export function Resizable({ children, nodeLink }: { children: ReactNode; nodeLink: string }) {
  return (
    <ResizablePanelGroup direction="horizontal" className="h-full w-full rounded-lg border">
      <ResizablePanel defaultSize={20}>
        <Link href="/bsc/dashboard/main">
          <p>main</p>
        </Link>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={80}>
        <div className="h-full w-full">{children}</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
