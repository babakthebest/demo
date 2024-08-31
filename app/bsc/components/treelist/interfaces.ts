export interface TreeNode {
  id: number;
  parentId: number | null;
  name: string;
  children?: Array<ExpandedTreeNode>;
}

export interface ExpandedTreeNode extends TreeNode {
  expanded: boolean;
}
