import * as React from "react";
import { InfoBox } from "./InfoBox";
import { ICategoryStore, INode, INodeClickable } from "./ts/interfaces";
import {
  Tree,
  TreeWithMenu,
  Node,
  AddRootNode,
  ExpandAll,
  CategoryHeader,
  Wrapper
} from "./lib/components";
import "./styles.css";
import { afterSetOpenProperty, genID } from "./utils";
import { useSelector, useDispatch } from "react-redux";
import { CategoryActionCreators } from "./data/category.actions";

export default function App() {
  const categories = useSelector(
    (state: ICategoryStore<INode>) => state.categories
  );

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(CategoryActionCreators.getCategoryList());
  }, [dispatch]);

  const updateTree = (nodes: Array<INode>) => {
    dispatch(CategoryActionCreators.postCategoryList(nodes));
  };
  const expandAll = () => {
    const expandedNodes = afterSetOpenProperty(categories, true);
    updateTree(expandedNodes as INode[]);
  };
  const addRootNode = (name: string) => {
    const newNode: INode = { name, id: genID(), subNodes: [], open: false };
    updateTree([...categories, newNode]);
  };

  return (
    <>
      <InfoBox />
      <AddRootNode addRootNode={addRootNode}>
        <ExpandAll expandAll={expandAll} />
      </AddRootNode>
      <Wrapper>
        <CategoryHeader />
        <TreeWithMenu>
          <Tree nodes={categories} updateTree={updateTree}>
            {({
              name,
              open,
              expandNode,
              id,
              children,
              updateNode,
              addSubNode,
              deleteNode,
              subNodes
            }: INodeClickable) => (
              <Node
                id={id}
                name={name}
                open={open}
                expandNode={expandNode}
                updateNode={updateNode}
                addSubNode={addSubNode}
                deleteNode={deleteNode}
                subNodes={subNodes}
              >
                {open && children}
              </Node>
            )}
          </Tree>
        </TreeWithMenu>
      </Wrapper>
    </>
  );
}
