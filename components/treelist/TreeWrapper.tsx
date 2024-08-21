"use client";
import Tree, { TreeNode } from "./Tree";
import fileSystem from "./data";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function TreeWrapper() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Tree data={fileSystem as TreeNode[]}></Tree>;
    </DndProvider>
  );
}
