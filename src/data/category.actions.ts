import {
  ICategoryActionType,
  ICategoryActionWithPayload
} from "../ts/interfaces";

export enum CategoryActions {
  GET_CATEGORY_LIST = "GET_CATEGORY_LIST",
  GET_CATEGORY_LIST_COMPLETED = "GET_CATEGORY_LIST_COMPLETED",
  POST_CATEGORY_LIST = "POST_CATEGORY_LIST",
  POST_CATEGORY_LIST_COMPLETED = "POST_CATEGORY_LIST_COMPLETED"
}

export const CategoryActionCreators = {
  getCategoryList: (): ICategoryActionType => ({
    type: CategoryActions.GET_CATEGORY_LIST
  }),
  getCategoryListCompleted: <T>(
    payload: T[]
  ): ICategoryActionWithPayload<T> => ({
    type: CategoryActions.GET_CATEGORY_LIST_COMPLETED,
    payload
  }),
  postCategoryList: <T>(payload: T[]): ICategoryActionWithPayload<T> => ({
    type: CategoryActions.POST_CATEGORY_LIST,
    payload
  }),
  postCategoryListCompleted: <T>(
    payload: T[]
  ): ICategoryActionWithPayload<T> => ({
    type: CategoryActions.POST_CATEGORY_LIST_COMPLETED,
    payload
  })
};
