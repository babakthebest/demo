import { create } from "zustand";
import { ExpandedTreeNode, TreeNode } from "./interfaces";

type TreeDataState = {
  treeData: ExpandedTreeNode[];
  allExpanded: boolean;
  showAddChildForm: boolean;
  showEditForm: boolean;
  showDefaultForm: boolean;
  setShowAddChildForm: (addChild: boolean) => void;
  setShowAddEditForm: (edit: boolean) => void;
  setShowDefaultForm: (edit: boolean) => void;
  setAllExpanded: (allExpanded: boolean) => void;
  deleteNode: (nodeId: number) => void;
  addNodeToTree: (nodeToAdd: ExpandedTreeNode, targetNodeId: number) => void;
  editNodeInTree: (updatedNode: ExpandedTreeNode) => void;
};
type SetTreeData = (data: TreeNode[] | ((prevData: ExpandedTreeNode[]) => ExpandedTreeNode[])) => void;
type SetAllexpandedType = (allExpanded: boolean | ((prevData: boolean) => boolean)) => void;

const useTreeDataStore = create<TreeDataState & { setTreeData: SetTreeData } & { setAllExpanded: SetAllexpandedType }>(
  (set) => ({
    treeData: [],
    allExpanded: false,
    showAddChildForm: false,
    showEditForm: false,
    showDefaultForm: false,
    setShowAddChildForm: (showAddChildForm) =>
      set({ showAddChildForm: showAddChildForm, showEditForm: false, showDefaultForm: false }),
    setShowAddEditForm: (showEditForm) =>
      set({ showAddChildForm: false, showEditForm: showEditForm, showDefaultForm: false }),
    setShowDefaultForm: (showDefaultForm) =>
      set({ showAddChildForm: false, showEditForm: false, showDefaultForm: showDefaultForm }),
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

    deleteNode: (nodeId: number) => {
      set((state) => ({
        treeData: removeNode(state.treeData, nodeId),
      }));
    },
    addNodeToTree: (nodeToAdd, targetNodeId) => {
      set((state) => ({
        treeData: addNode(state.treeData, nodeToAdd, targetNodeId), // Add the new node to the tree
      }));
    },

    editNodeInTree: (updatedNode) => {
      set((state) => ({
        treeData: editNode(state.treeData, updatedNode), // Update the tree by editing the node
      }));
    },
  }),
);
export default useTreeDataStore;

const editNode = (nodes: ExpandedTreeNode[], updatedNode: ExpandedTreeNode): ExpandedTreeNode[] => {
  return nodes.map((node) => {
    if (Number(node.id) === Number(updatedNode.id)) {
      return {
        ...node,
        ...updatedNode, // Update the node with new properties
      };
    }

    if (node.children) {
      return {
        ...node,
        children: editNode(node.children, updatedNode), // Recursively update children if needed
      };
    }
    return node;
  });
};

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

const removeNode = (nodes: ExpandedTreeNode[], nodeToRemoveId: number): ExpandedTreeNode[] => {
  return nodes.reduce((acc: ExpandedTreeNode[], node) => {
    if (Number(node.id) === Number(nodeToRemoveId)) return acc;
    if (node.children) {
      return [
        ...acc,
        {
          ...node,
          children: removeNode(node.children, nodeToRemoveId),
        },
      ];
    }
    return [...acc, node];
  }, []);
};

const addNode = (nodes: ExpandedTreeNode[], nodeToAdd: ExpandedTreeNode, targetNodeId: number): ExpandedTreeNode[] => {
  return nodes.map((node) => {
    if (Number(node.id) === Number(targetNodeId)) {
      return {
        ...node,
        children: [...(node.children || []), nodeToAdd],
      };
    }

    if (node.children) {
      return {
        ...node,
        children: addNode(node.children, nodeToAdd, targetNodeId),
      };
    }
    return node;
  });
};
export function moveNode(draggedNode: ExpandedTreeNode, targetNodeId: number, setTreeData: SetTreeData) {
  if (Number(draggedNode.id) === Number(targetNodeId)) return;
  setTreeData((prevData) => {
    const dataWithoutDraggedNode = removeNode(prevData, draggedNode.id);

    // Before returning, let's ensure the correct addition happens
    const newData = addNode(dataWithoutDraggedNode, draggedNode, targetNodeId);
    return newData;
  });
}

export const findNodeById = (nodeId: number, nodes: ExpandedTreeNode[]): ExpandedTreeNode | null => {
  const stack = [...nodes]; // Start with a stack containing the root nodes

  while (stack.length > 0) {
    const node = stack.pop();
    if (node) {
      if (Number(node.id) === Number(nodeId)) {
        return node;
      }

      if (node.children) {
        stack.push(...node.children); // Add children to the stack to explore later
      }
    }
  }

  return null; // Return null if no node found
};
