import { create } from "zustand";
import { ExpandedTreeNode, TreeNode } from "../interfaces";
type TreeDataState = {
  treeData: ExpandedTreeNode[];
};
type SetTreeDataState = {
  setTreeData: (data: TreeNode[] | ((prevData: ExpandedTreeNode[]) => ExpandedTreeNode[])) => void;
};

const useTreeDataStore = create<TreeDataState & SetTreeDataState>((set) => ({
  treeData: [],
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
}));
export default useTreeDataStore;

// const toggleExpandNode = (nodeId: number, setTreeData: SetTreeDataState) => {
//   setTreeData((prevData) =>
//     prevData.map((node) => {
//       if (node.id === nodeId) {
//         return { ...node, expanded: !node.expanded };
//       }
//       // Recursively toggle children if they exist
//       if (node.children) {
//         return {
//           ...node,
//           children: toggleExpandInChildren(node.children, nodeId),
//         };
//       }
//       return node;
//     }),
//   );
// };
// const toggleExpandInChildren = (children: ExpandedTreeNode[], nodeId: number): ExpandedTreeNode[] => {
//   return children.map((child) => {
//     if (child.id === nodeId) {
//       return { ...child, expanded: !child.expanded };
//     }
//     if (child.children) {
//       return {
//         ...child,
//         children: toggleExpandInChildren(child.children, nodeId),
//       };
//     }
//     return child;
//   });
// };
