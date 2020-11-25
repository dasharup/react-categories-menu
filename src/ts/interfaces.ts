import * as React from "react";
import { tCategoryActions } from "./types";

export enum FormActions {
  ADD = "ADD",
  UPDATE = "UPDATE",
  NONE = ""
}
export interface Id {
  id: number;
}

export interface iRightClickContext extends Id {
  setCloseMenu: (closeMenu: boolean) => void;
}

export interface INode extends Id {
  name: string;
  open: boolean;
  subNodes: Array<INode>;
}

export interface INodeClickable extends INode {
  expandNode: (id: number) => void;
  updateNode: (id: number, name: string) => void;
  addSubNode: (id: number, name: string) => void;
  deleteNode: (id: number) => void;
  children: React.ReactNode;
}

export interface ITree {
  nodes: Array<INode>;
  updateTree: (nodes: Array<INode>) => void;
  children: (params: INodeClickable) => React.ReactNode;
}

export interface IForm {
  saveChanges: (name: string) => void;
  cancel: () => void;
}

export interface ICategoryActionType {
  type: tCategoryActions;
}

export interface ICategoryActionWithPayload<T> extends ICategoryActionType {
  payload: T[];
}

export interface ICategoryStore<T> {
  categories: T[];
}

export interface IAddRootNode {
  addRootNode: (name: string) => void;
}

export interface IExpandAll {
  expandAll: () => void;
}
