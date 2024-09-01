"use client";
import ContextMenu from "@/app/bsc/components/treelist/contextMenu/contextmenu";
import { useContextMenu } from "@/app/bsc/components/treelist/contextMenu/useContextMenu";
import { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { FiFile, FiFileMinus, FiFolder, FiFolderMinus, FiFolderPlus } from "react-icons/fi";

interface FileNode {
  id: number;
  parentId: number | null;
  type: "file";
  name: string;
}
interface FolderNode {
  id: number;
  parentId: number | null;
  type: "folder";
  name: string;
  children: Array<FileNode | FolderNode>;
}
export type TreeNode = FileNode | FolderNode;
interface NodeProps {
  node: TreeNode;
  moveNode: (draggedNode: TreeNode, targetNode: TreeNode) => void;
}
interface TreeProps {
  data: TreeNode[];
}

const Tree: React.FC<TreeProps> = ({ data }) => {
  // const moveNode = (draggedNode: TreeNode, targetNode: TreeNode) => {
  //   console.log("draggedNode=>", draggedNode);
  //   console.log("targetNode=>", targetNode);
  // };

  const [treeData, setTreeData] = useState(data);
  console.log("treeData=>", treeData);
  const moveNode = (draggedNode: TreeNode, targetNode: TreeNode) => {
    console.log("Move Node Called: ", Date.now());
    console.log("draggedNode=>", draggedNode);
    console.log("targetNode=>", targetNode);
    if ((targetNode.type = "file")) {
      console.warn("Dragged node is the same as the target node. Skipping move.");
      return;
    }
    const removeNode = (nodes: TreeNode[], nodeToRemove: TreeNode): TreeNode[] => {
      return nodes.reduce((acc: TreeNode[], node) => {
        if (node === nodeToRemove) return acc;
        if (node.type === "folder" && node.children) {
          return [
            ...acc,
            {
              ...node,
              children: removeNode(node.children, nodeToRemove),
            },
          ];
        }
        return [...acc, node];
      }, []);
    };
    const addNode = (nodes: TreeNode[], nodeToAdd: TreeNode, targetNode: TreeNode): TreeNode[] => {
      return nodes.map((node) => {
        // Ensure we are targeting the correct folder
        if (node.name === targetNode.name && node.type === targetNode.type) {
          if (node.type === "folder") {
            console.log("Adding node to target:", targetNode.name);
            return {
              ...node,
              children: [...(node.children || []), nodeToAdd],
            };
          }
        }

        if (node.type === "folder" && node.children) {
          return {
            ...node,
            children: addNode(node.children, nodeToAdd, targetNode),
          };
        }
        return node;
      });
    };
    setTreeData((prevData) => {
      const dataWithoutDraggedNode = removeNode(prevData, draggedNode);
      console.log("dataWithoutDraggedNode=>", dataWithoutDraggedNode);

      // Before returning, let's ensure the correct addition happens
      const newData = addNode(dataWithoutDraggedNode, draggedNode, targetNode);
      console.log("New Tree Data:", newData);
      return newData;
    });
  };
  return (
    <div>
      {treeData.map((node) => (
        <Node key={node.name} node={node} moveNode={moveNode}></Node>
      ))}
    </div>
  );
};

const Node: React.FC<NodeProps> = ({ node, moveNode }) => {
  const [expanded, setExpanded] = useState(false);
  const toggleExpand = () => {
    setExpanded(!expanded);
  };
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
    drop: (item: { node: TreeNode }, monitor) => {
      if (monitor.didDrop()) {
        // If the event was already handled, don't do anything
        return;
      }
      moveNode(item.node, node);
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
        <div onClick={toggleExpand} className="my-2 flex gap-2">
          {node.type === "folder" ? (
            expanded ? (
              <FiFolderPlus className="text-[25px] text-blue-500" />
            ) : (
              <FiFolderMinus className="text-[25px] text-blue-500" />
            )
          ) : (
            // "📄"
            <FiFile className="text-[25px] text-blue-500" />
          )}
          <div onContextMenu={(e) => showContextMenu(e)}> {node.name}</div>
        </div>
        {node.type === "folder" && node.children && !expanded && (
          <div className="">
            {node.children.map((child) => (
              <Node key={child.name} node={child} moveNode={moveNode} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Tree;
