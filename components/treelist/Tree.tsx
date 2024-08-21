"use client";
import ContextMenu from "@/components/contextMenu/contextmenu";
import { useContextMenu } from "@/components/contextMenu/useContextMenu";
import { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import {
  FiFile,
  FiFileMinus,
  FiFolder,
  FiFolderMinus,
  FiFolderPlus,
} from "react-icons/fi";

interface FileNode {
  type: "file";
  name: string;
}
interface FolderNode {
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
    console.log("draggedNode=>", draggedNode);
    console.log("targetNode=>", targetNode);
    const removeNode = (
      nodes: TreeNode[],
      nodeToRemove: TreeNode
    ): TreeNode[] => {
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

    const addNode = (
      nodes: TreeNode[],
      nodeToAdd: TreeNode,
      targetNode: TreeNode
    ): TreeNode[] => {
      return nodes.map((node) => {
        if (node === targetNode && node.type === "folder") {
          return {
            ...node,
            children: [...(node.children || []), nodeToAdd],
          };
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
      return addNode(dataWithoutDraggedNode, draggedNode, targetNode);
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
  const {
    isContextMenuVisible,
    contextMenuCoordinates,
    showContextMenu,
    hideContextMenu,
  } = useContextMenu();
  const [{ isDragging }, dragRef] = useDrag({
    type: "TREE_NODE",
    item: { node },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: "TREE_NODE",
    drop: (item: { node: TreeNode }) => {
      moveNode(item.node, node);
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
        className={`ml-5 ${isDragging ? "opacity-50" : ""}`}>
        <div onClick={toggleExpand} className='flex gap-2 my-2'>
          {node.type === "folder" ? (
            expanded ? (
              <FiFolderPlus className='text-blue-500 text-[25px]' />
            ) : (
              <FiFolderMinus className='text-blue-500 text-[25px]' />
            )
          ) : (
            // "📄"
            <FiFile className='text-blue-500 text-[25px]' />
          )}
          <div onContextMenu={(e) => showContextMenu(e)}> {node.name}</div>
        </div>
        {node.type === "folder" && node.children && !expanded && (
          <div className=''>
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
