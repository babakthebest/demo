"use client";
import ContextMenu from "@/app/bsc/components/treelist/contextMenu/contextmenu";
import { useContextMenu } from "@/app/bsc/components/treelist/contextMenu/useContextMenu";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
// import { FiFile, FiFileMinus, FiFolder, FiFolderMinus, FiFolderPlus } from "react-icons/fi";
import { FaChevronRight, FaChevronDown, FaChartBar, FaChartLine } from "react-icons/fa";
import { ExpandedTreeNode, TreeNode } from "./interfaces";
import useTreeDataStore, { moveNode, toggleExpandAll, toggleExpandNode } from "./useTreeDataStore";
import { useRouter } from "next/navigation";

interface NodeProps {
  node: ExpandedTreeNode;
  expanded: boolean;
}
interface TreeProps {
  data: TreeNode[];
}

const Tree: React.FC<TreeProps> = ({ data }) => {
  const { treeData, setTreeData, setAllExpanded, allExpanded } = useTreeDataStore();
  console.log("treeData", treeData);
  useEffect(() => {
    setTreeData(data);
  }, [data]);

  return (
    <div>
      <div className="p-2">
        <Button onClick={() => toggleExpandAll(setTreeData, setAllExpanded, allExpanded)} variant="outline">
          {!allExpanded ? "Collapse All" : "Expand All"}
        </Button>
      </div>
      {treeData.map((node) => (
        <Node key={node.id} node={node} expanded={node.expanded}></Node>
      ))}
    </div>
  );
};

const Node: React.FC<NodeProps> = ({ node, expanded }) => {
  const { setTreeData } = useTreeDataStore();
  const router = useRouter();
  const { isContextMenuVisible, contextMenuCoordinates, showContextMenu, hideContextMenu } = useContextMenu();
  const [{ isDragging }, dragRef] = useDrag({
    type: "TREE_NODE",
    item: { node },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: "TREE_NODE",
    drop: (item: { node: ExpandedTreeNode }, monitor) => {
      if (monitor.didDrop()) {
        // If the event was already handled, don't do anything
        return;
      }
      moveNode(item.node, node, setTreeData);
      monitor.getHandlerId(); // This ensures that the drop event doesn't bubble up.
    },
  });
  const contextMenuOption = [
    {
      name: "choose",
      callback: () => {
        console.log(node);
      },
    },
    {
      name: "delete",
      callback: () => {},
    },
  ];
  return (
    <>
      <ContextMenu
        options={contextMenuOption}
        coordinates={contextMenuCoordinates}
        contextMenu={isContextMenuVisible}
        hideContextMenu={hideContextMenu}
      />
      <div
        ref={(el) => {
          dragRef(el);
          dropRef(el);
        }}
        className={`ml-5 ${isDragging ? "opacity-50" : ""}`}
      >
        <div className="my-2 flex h-full items-center gap-1">
          {node.children ? (
            node.expanded ? (
              <FaChevronDown
                onClick={() => toggleExpandNode(node.id, setTreeData)}
                className="text-[15px] text-blue-500"
              />
            ) : (
              <FaChevronRight
                onClick={() => toggleExpandNode(node.id, setTreeData)}
                className="text-[15px] text-blue-500"
              />
            )
          ) : (
            <FaChartBar className="text-[15px] text-blue-500" />
          )}
          <div
            onContextMenu={(e) => showContextMenu(e)}
            onClick={() => router.push(`./${node.id}`)}
            className="cursor-pointer"
          >
            {node.name}
          </div>
        </div>
        {node.children && !node.expanded && (
          <div className="">
            {node.children.map((child) => (
              <Node key={child.id} node={child} expanded={expanded} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Tree;
