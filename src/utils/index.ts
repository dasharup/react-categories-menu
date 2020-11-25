import { INode } from "../ts/interfaces";

let id = 0;
export const genID = () => {
  id = id + 1;
  return id;
};

export function afterSetOpenProperty<T extends Partial<INode>>(
  nodes: T[],
  to: boolean
): T[] {
  nodes.forEach((node) => {
    node.open = true;
    if (node.subNodes) {
      afterSetOpenProperty(node.subNodes, to);
    }
  });
  return nodes;
}
