import { CategoryActions } from "../data/category.actions";

export type tCategoryActions =
  | CategoryActions.GET_CATEGORY_LIST
  | CategoryActions.GET_CATEGORY_LIST_COMPLETED
  | CategoryActions.POST_CATEGORY_LIST_COMPLETED
  | CategoryActions.POST_CATEGORY_LIST;
