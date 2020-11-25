import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  CategoryActionCreators,
  CategoryActions
} from "../data/category.actions";
import { API } from "../api";
import { ICategoryActionWithPayload, INode } from "../ts/interfaces";

function* getCategorySaga() {
  const categories = yield call(API.getCategories);
  if (categories.length) {
    yield put(CategoryActionCreators.getCategoryListCompleted(categories));
  }
}

function* postCategorySaga(action: ICategoryActionWithPayload<INode>) {
  const { payload } = action;
  const categories = yield call(API.postCategories(payload));
  if (categories) {
    yield put(CategoryActionCreators.postCategoryListCompleted(categories));
  }
}

export default function* categorySaga() {
  yield all([
    takeLatest(CategoryActions.GET_CATEGORY_LIST, getCategorySaga),
    takeLatest(CategoryActions.POST_CATEGORY_LIST, postCategorySaga)
  ]);
}
