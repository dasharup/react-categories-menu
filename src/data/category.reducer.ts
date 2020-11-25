import {
  ICategoryActionWithPayload,
  ICategoryStore,
  INode
} from "../ts/interfaces";
import { CategoryActions } from "./category.actions";

const initialState: ICategoryStore<INode> = {
  categories: []
};

export const categoryReducer = (
  state: ICategoryStore<INode> = initialState,
  action: ICategoryActionWithPayload<INode>
): ICategoryStore<INode> => {
  const { type, payload } = action;
  switch (type) {
    case CategoryActions.GET_CATEGORY_LIST_COMPLETED:
      return {
        ...state,
        categories: [...payload]
      };
    case CategoryActions.POST_CATEGORY_LIST_COMPLETED:
      return {
        ...state,
        categories: [...payload]
      };
    default:
      return state;
  }
};
