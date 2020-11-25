import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { categoryReducer } from "./category.reducer";
import categorySaga from "./category.saga";
const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  categoryReducer,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(categorySaga);
