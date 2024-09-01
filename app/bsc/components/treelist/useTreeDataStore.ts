import { create } from "zustand";
import { ExpandedTreeNode, TreeNode } from "./interfaces";

type TreeDataState = {
  treeData: ExpandedTreeNode[];
  allExpanded: boolean;
  setAllExpanded: (allExpanded: boolean) => void;
};
type SetTreeData = (data: TreeNode[] | ((prevData: ExpandedTreeNode[]) => ExpandedTreeNode[])) => void;
type SetAllexpandedType = (allExpanded: boolean | ((prevData: boolean) => boolean)) => void;

const useTreeDataStore = create<TreeDataState & { setTreeData: SetTreeData } & { setAllExpanded: SetAllexpandedType }>(
  (set) => ({
    treeData: [],
    allExpanded: false,
    setAllExpanded: (expand) => {
      set((state) => {
        if (typeof expand === "function") {
          return {
            allExpanded: expand(state.allExpanded),
          };
        }
        return { allExpanded: expand };
      });
    },
    setTreeData: (data) => {
      // set({ treeData: initializedData });
      set((state) => {
        if (typeof data === "function") {
          return {
            treeData: data(state.treeData),
          };
        }
        const initializedData = data.map((node) => ({ ...node, expanded: false }));
        return { treeData: initializedData };
      });
    },
  }),
);
export default useTreeDataStore;

export function toggleExpandNode(nodeId: number, setTreeData: SetTreeData) {
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

  setTreeData((prevData) =>
    prevData.map((node) => {
      if (node.id === nodeId) {
        return { ...node, expanded: !node.expanded };
      }
      if (node.children) {
        return {
          ...node,
          children: toggleExpandInChildren(node.children, nodeId),
        };
      }
      return node;
    }),
  );
}

export function toggleExpandAll(setTreeData: SetTreeData, setAllExpanded: SetAllexpandedType, allExpanded: boolean) {
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
  setAllExpanded((prev) => !prev);
  setTreeData((prevData) =>
    prevData.map((node) => ({
      ...node,
      expanded: !allExpanded,
      children: toggleChildrenExpand(node.children, !allExpanded),
    })),
  );
}

export function moveNode(draggedNode: ExpandedTreeNode, targetNode: ExpandedTreeNode, setTreeData: SetTreeData) {
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
}
