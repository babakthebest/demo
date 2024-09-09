export interface TreeNode {
  id: number;
  parentId: number | null;
  name: string;
  children?: Array<ExpandedTreeNode>;
  manager: string;
  isActive: boolean;
  assesment: string;
  model: string;
}

export interface ExpandedTreeNode extends TreeNode {
  expanded: boolean;
}
