"use client";
import ContextMenu from "@/components/contextMenu/contextmenu";
import { useContextMenu } from "@/components/contextMenu/useContextMenu";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
// import { FiFile, FiFileMinus, FiFolder, FiFolderMinus, FiFolderPlus } from "react-icons/fi";
import { FaChevronRight, FaChevronDown, FaChartBar, FaChartLine } from "react-icons/fa";
import { ExpandedTreeNode, TreeNode } from "./interfaces";
import useTreeDataStore from "./hooks/useTreeDataStore";

interface NodeProps {
  node: ExpandedTreeNode;
  moveNode: (draggedNode: ExpandedTreeNode, targetNode: ExpandedTreeNode) => void;
  expanded: boolean;
  toggleExpandNode: (nodeId: number) => void;
}
interface TreeProps {
  data: TreeNode[];
}

const Tree: React.FC<TreeProps> = ({ data }) => {
  // const [treeData, setTreeData] = useState(data.map((node) => ({ ...node, expanded: false })));
  const { treeData, setTreeData } = useTreeDataStore();
  const [allExpanded, setAllExpanded] = useState(false);

  const toggleExpandNode = (nodeId: number) => {
    setTreeData((prevData) =>
      prevData.map((node) => {
        if (node.id === nodeId) {
          return { ...node, expanded: !node.expanded };
        }
        // Recursively toggle children if they exist
        if (node.children) {
          return {
            ...node,
            children: toggleExpandInChildren(node.children, nodeId),
          };
        }
        return node;
      }),
    );
  };
  const toggleExpandInChildren = (children: ExpandedTreeNode[], nodeId: number): ExpandedTreeNode[] => {
    return children.map((child) => {
      if (child.id === nodeId) {
        return { ...child, expanded: !child.expanded };
      }
      if (child.children) {
        return {
          ...child,
          children: toggleExpandInChildren(child.children, nodeId),
        };
      }
      return child;
    });
  };
  const toggleExpandAll = () => {
    setAllExpanded((prev) => !prev);
    setTreeData((prevData) =>
      prevData.map((node) => ({
        ...node,
        expanded: !allExpanded,
        children: toggleChildrenExpand(node.children, !allExpanded),
      })),
    );
  };

  const toggleChildrenExpand = (
    children: ExpandedTreeNode[] | undefined,
    expanded: boolean,
  ): ExpandedTreeNode[] | undefined => {
    if (!children) return undefined;
    return children.map((child) => ({
      ...child,
      expanded: expanded,
      children: toggleChildrenExpand(child.children, expanded),
    }));
  };
  // console.log("treeData=>", treeData);
  const moveNode = (draggedNode: ExpandedTreeNode, targetNode: ExpandedTreeNode) => {
    // console.log("Move Node Called: ", Date.now());
    // console.log("draggedNode=>", draggedNode);
    // console.log("targetNode=>", targetNode);
    const removeNode = (nodes: ExpandedTreeNode[], nodeToRemove: ExpandedTreeNode): ExpandedTreeNode[] => {
      return nodes.reduce((acc: ExpandedTreeNode[], node) => {
        if (node === nodeToRemove) return acc;
        if (node.children) {
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
      nodes: ExpandedTreeNode[],
      nodeToAdd: ExpandedTreeNode,
      targetNode: ExpandedTreeNode,
    ): ExpandedTreeNode[] => {
      return nodes.map((node) => {
        // Ensure we are targeting the correct folder
        if (node.id === targetNode.id) {
          // if (node.children) {
          console.log("Adding node to target:", targetNode.name);
          return {
            ...node,
            children: [...(node.children || []), nodeToAdd],
          };
          // }
        }

        if (node.children) {
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
      <div className="mb-4">
        <Button onClick={toggleExpandAll} variant="outline">
          {!allExpanded ? "Collapse All" : "Expand All"}
        </Button>
        {/* <button onClick={toggleExpandAll} className="rounded bg-blue-500 px-4 py-2 text-white">
          {!allExpanded ? "Collapse All" : "Expand All"}
        </button> */}
      </div>
      {treeData.map((node) => (
        <Node
          key={node.id}
          node={node}
          moveNode={moveNode}
          expanded={node.expanded}
          toggleExpandNode={toggleExpandNode}
        ></Node>
      ))}
    </div>
  );
};

const Node: React.FC<NodeProps> = ({ node, moveNode, expanded, toggleExpandNode }) => {
  const toggleExpand = () => {
    toggleExpandNode(node.id);
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
    drop: (item: { node: ExpandedTreeNode }, monitor) => {
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
          {node.children ? (
            node.expanded ? (
              <FaChevronDown className="text-[15px] text-blue-500" />
            ) : (
              <FaChevronRight className="text-[15px] text-blue-500" />
            )
          ) : (
            <FaChartBar className="text-[15px] text-blue-500" />
          )}
          <div onContextMenu={(e) => showContextMenu(e)}>{node.name}</div>
        </div>
        {node.children && !node.expanded && (
          <div className="">
            {node.children.map((child) => (
              <Node
                key={child.id}
                node={child}
                moveNode={moveNode}
                expanded={expanded}
                toggleExpandNode={toggleExpandNode}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Tree;
