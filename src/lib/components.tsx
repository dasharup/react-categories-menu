import * as React from "react";
import {
  FormActions,
  IAddRootNode,
  IExpandAll,
  IForm,
  INode,
  INodeClickable,
  ITree
} from "../ts/interfaces";
import { RightClickContext, useRightClickContext } from "./contexts";
import { genID } from "../utils";

/**
 * @Form
 * @description used for adding and updating nodes
 ******************************************************************************************************/
export const Form: React.FC<IForm> = ({ saveChanges, cancel }) => {
  const [name, setName] = React.useState<string>("");
  return (
    <div
      style={{
        border: "1px solid lightGrey",
        padding: "5px",
        maxHeight: "40px"
      }}
    >
      <input
        id="name"
        type="text"
        placeholder="name"
        onChange={(e) => setName(e.target.value)}
        style={{
          padding: "5px",
          border: "0px",
          borderBottom: "2px solid lightgrey",
          color: "black",
          outline: "0px"
        }}
      />
      <button
        type="submit"
        disabled={name.length < 1}
        onClick={() => saveChanges(name)}
        style={{ padding: "10px", marginLeft: "20px" }}
      >
        save
      </button>
      <button
        onClick={() => cancel()}
        style={{ padding: "10px", marginLeft: "20px" }}
      >
        cancel
      </button>
    </div>
  );
};

/*********
 * @Menu for adding editing and deleting node.
 * ********************************************************************************************* */
const Menu: React.FC<{
  hidden: boolean;
  addSubNode: (name: string) => void;
  updateNode: (name: string) => void;
  deleteNode: () => void;
  hideMenu: () => void;
}> = ({ hidden, addSubNode, updateNode, deleteNode, hideMenu }) => {
  const [formType, setFormType] = React.useState<FormActions>(FormActions.NONE);
  const closeForm = () => {
    setFormType(FormActions.NONE);
    hideMenu();
  };
  const saveChanges = (name: string) => {
    if (formType === FormActions.ADD) {
      addSubNode(name);
    }
    if (formType === FormActions.UPDATE) {
      updateNode(name);
    }
    closeForm();
  };
  return (
    <div
      hidden={hidden}
      style={{
        position: "absolute",
        backgroundColor: "black",
        color: "white",
        padding: "10px",
        border: "1px solid grey",
        display: !hidden ? "flex" : "",
        justifyContent: "space-between",
        minWidth: "150px"
      }}
    >
      {formType === FormActions.NONE ? (
        <>
          <button
            onClick={() => {
              setFormType(FormActions.UPDATE);
            }}
          >
            edit
          </button>
          <button
            onClick={() => {
              setFormType(FormActions.ADD);
            }}
          >
            add
          </button>
          <button
            onClick={() => {
              deleteNode();
            }}
          >
            delete
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              hideMenu();
            }}
          >
            cancel
          </button>
        </>
      ) : (
        <Form saveChanges={saveChanges} cancel={closeForm} />
      )}
    </div>
  );
};

/*********
 * @description used for expanding and collapsing node.
 * ********************************************************************************************* */
const expandStyle = {
  padding: "2px",
  backgroundColor: "black",
  color: "white",
  display: "inline-block",
  width: "15px",
  marginLeft: "9px",
  textAlign: "center"
};
const ExpandIcon: React.FC<Pick<INode, "open">> = ({ open }) =>
  open ? <b style={{...expandStyle, textAlign: "center"}}> - </b> : <b style={{...expandStyle, textAlign: "center"}}> + </b>;

/**********
 * @description used for displaying node name
 * ******************************************************************************************** */
const Item: React.FC<Pick<INode, "name">> = ({ name }) => (
  <span style={{ fontSize: "22px" }}>{name}</span>
);

/**********
 * @description binds @Item @ExpandIcon ,@Menu and @Form to a single functionality
 * ******************************************************************************************** */
export const Node: React.FC<INodeClickable> = ({
  id,
  name,
  open,
  expandNode,
  addSubNode,
  updateNode,
  deleteNode,
  children
}) => {
  const [closeMenu, setCloseMenu] = React.useState<boolean>(false);
  const { ref, rightClickContext } = useRightClickContext({ id, setCloseMenu });
  const hideMenu = () => {
    setCloseMenu(true);
  };
  return (
    <li
      key={id}
      onClick={() => expandNode(id)}
      id={ref.current.id.toString()}
      style={{
        paddingTop: "15px",
        paddingLeft: "20px",
        paddingRight: "5px",
        width: "fit-content",
        verticalAlign: "center"
      }}
    >
      <Item name={name} />
      <ExpandIcon open={open} />
      {!closeMenu && (
        <Menu
          hidden={rightClickContext.menuId !== id}
          addSubNode={(name) => addSubNode(id, name)}
          updateNode={(name) => updateNode(id, name)}
          deleteNode={() => deleteNode(id)}
          hideMenu={hideMenu}
        />
      )}
      {children}
    </li>
  );
};

/**********
 * @description provides context values for the Menu functionality
 * ******************************************************************************************** */
export const TreeWithMenu: React.FC = ({ children }) => {
  const [menuId, setMenuId] = React.useState(0);

  return (
    <RightClickContext.Provider
      value={{
        menuId,
        setMenuId
      }}
    >
      {children}
    </RightClickContext.Provider>
  );
};

/**
 * @description The tree struture for displaying Nodes
 */
export const Tree: React.FC<ITree> = ({ nodes, children, updateTree }) => {
  const expandNode = (id: number) => {
    nodes.forEach((node) => {
      if (node.id === id) {
        node.open = true;
      }
    });
    updateTree(nodes);
  };
  const updateNode = (id: number, name: string) => {
    nodes.forEach((node) => {
      if (node.id === id) {
        node.id = genID();
        node.name = name;
      }
    });
    updateTree(nodes);
  };
  const addSubNode = (id: number, name: string) => {
    nodes.forEach((node) => {
      if (node.id === id) {
        node.subNodes.push({
          id: genID(),
          name,
          open: false,
          subNodes: []
        });
      }
    });
    updateTree([...JSON.parse(JSON.stringify(nodes))]);
  };
  const deleteNode = (id: number) => {
    const index = nodes.findIndex((node) => node.id === id);
    nodes.splice(index, 1);
    updateTree([...nodes]);
  };
  return (
    <>
      {nodes.map(({ name, open, id, subNodes }) => {
        const nested =
          subNodes && subNodes.length > 0 ? (
            <div style={{ backgroundColor: "#e6e6e6", width: "fit-content" }}>
              <Tree nodes={subNodes} updateTree={updateTree}>
                {children}
              </Tree>
            </div>
          ) : null;
        return (
          <ul key={id}>
            {children({
              name,
              open,
              expandNode,
              updateNode,
              addSubNode,
              deleteNode,
              id,
              subNodes,
              children: nested
            })}
          </ul>
        );
      })}
    </>
  );
};

/**
 * @description add root node component
 */

export const AddRootNode: React.FC<IAddRootNode> = ({
  addRootNode,
  children
}) => {
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const saveAndClose = (name: string) => {
    setIsFormOpen(false);
    addRootNode(name);
  };
  return (
    <div
      style={{
        padding: "10px",
        display: "flex",
        justifyContent: "space-between"
      }}
    >
      {isFormOpen ? (
        <Form saveChanges={saveAndClose} cancel={() => setIsFormOpen(false)} />
      ) : (
        <button style={{ padding: "10px" }} onClick={() => setIsFormOpen(true)}>
          Add Node
        </button>
      )}
      {children}
    </div>
  );
};

export const ExpandAll: React.FC<IExpandAll> = ({ expandAll }) => (
  <button style={{ padding: "10px", maxHeight: "40px" }} onClick={expandAll}>
    expand all
  </button>
);

export const CategoryHeader: React.FC = () => (
  <h2
    style={{
      padding: "10px",
      borderBottom: "1px solid grey",
      marginTop: "0px",
      backgroundColor: "#9e9b9b"
    }}
  >
    categories
  </h2>
);

export const Wrapper: React.FC = ({ children }) => (
  <div
    style={{
      width: "fit-content",
      backgroundColor: "#e6e6e6",
      border: "1px solid grey",
      marginLeft: "10px"
    }}
  >
    {children}
  </div>
);
