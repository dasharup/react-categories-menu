import { genID } from "../utils";

export const db = {
  categories: [
    {
      id: genID(),
      name: "Furniture",
      open: false,
      subNodes: []
    },
    {
      id: genID(),
      name: "Electronics",
      open: false,
      subNodes: [
        {
          id: genID(),
          name: "Cell phones",
          open: false,
          subNodes: []
        },
        {
          id: genID(),
          name: "Cameras",
          open: false,
          subNodes: [
            {
              id: genID(),
              name: "Accessories",
              open: false,
              subNodes: [
                {
                  id: genID(),
                  name: "Pendrive",
                  open: false,
                  subNodes: [
                    {
                      id: genID(),
                      name: "Pendrive part 2",
                      open: false,
                      subNodes: []
                    }
                  ]
                }
              ]
            },
            {
              id: genID(),
              name: "Digital Cameras",
              open: false,
              subNodes: []
            }
          ]
        },
        {
          id: genID(),
          name: "Computers",
          open: false,
          subNodes: []
        }
      ]
    },
    {
      id: genID(),
      name: "Apparel",
      open: false,
      subNodes: []
    }
  ]
};
