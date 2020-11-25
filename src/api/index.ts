import { INode } from "../ts/interfaces";
import { db } from "./db";

// API IMPERSONATOR
const wait = (delay: number, categories: INode[]) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(categories);
    }, delay);
  });

// IDEAL API DELAY
const API_DELAY = 500;

// API SERVICE
export const API = {
  getCategories: () => wait(API_DELAY, db.categories),
  postCategories: (categories: INode[]) => () => wait(API_DELAY, categories)
};
