import { INode } from "../ts/interfaces";
import { db } from "./db";

const wait = (delay: number, categories: INode[]) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(categories);
    }, delay);
  });
const apiDelay = 500;
export const API = {
  getCategories: () => wait(apiDelay, db.categories),
  postCategories: (categories: INode[]) => () => wait(apiDelay, categories)
};
