"use client";
import Tree from "./Tree";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TreeNode } from "./interfaces";
import { fileSystemWithIds } from "../../trees/data";

export default function TreeWrapper({ nodeLink }: { nodeLink: string }) {
  return (
    <DndProvider backend={HTML5Backend}>
      <Tree nodeLink={nodeLink} data={fileSystemWithIds as TreeNode[]}></Tree>
    </DndProvider>
  );
}
