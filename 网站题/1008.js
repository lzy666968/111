/**
 * @param {number[]} preorder
 * @return {TreeNode}
 */
var bstFromPreorder = function (preorder) {
  const build = (preorder, start, end) => {
    if (start > end) return null;
    // 根据前序遍历的特点，根节点在第一位，后面接着左子树和右子树
    let rootVal = preorder[start];
    let root = new TreeNode(rootVal);
    // 根据 BST 的特点，左子树都比根节点的值小，右子树都比根节点的值大
    // rootIndex 就是左右子树的分界点
    let rootIndex = start;
    while (rootIndex <= end) {
      if (preorder[rootIndex] > preorder[start]) break;
      rootIndex++;
    }
    // [start+1, rootIndex-1] 区间内是左子树元素
    root.left = build(preorder, start + 1, rootIndex - 1);
    // [rootIndex, end] 区间内是右子树元素
    root.right = build(preorder, rootIndex, end);
    return root;
  };
  // 前闭后闭区间
  return build(preorder, 0, preorder.length - 1);
};

