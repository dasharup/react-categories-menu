import { genID } from "../utils";

export const db = {
  categories: [
    {
      id: genID(),
      name: "node-0",
      open: false,
      subNodes: [
        {
          id: genID(),
          name: "node-0-0",
          open: false,
          subNodes: [
            {
              id: genID(),
              name: "node-0-0-0",
              open: false,
              subNodes: []
            },
            {
              id: genID(),
              name: "node-0-0-1",
              open: false,
              subNodes: []
            }
          ]
        },
        {
          id: genID(),
          name: "node-0-1",
          open: false,
          subNodes: []
        }
      ]
    },
    {
      id: genID(),
      name: "node-1",
      open: false,
      subNodes: [
        {
          id: genID(),
          name: "node-1-0",
          open: false,
          subNodes: []
        }
      ]
    }
  ]
};
