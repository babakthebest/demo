// data/fileSystem.js
export const fileSystem = [
  {
    type: "folder",
    name: "src",
    children: [
      {
        type: "folder",
        name: "components",
        children: [
          { type: "file", name: "Header.js" },
          { type: "file", name: "Footer.js" },
        ],
      },
      { type: "file", name: "index.js" },
      { type: "file", name: "App.js" },
    ],
  },
  {
    type: "folder",
    name: "public",
    children: [
      { type: "file", name: "index.html" },
      { type: "file", name: "favicon.ico" },
    ],
  },
  // {
  //   type: "file",
  //   name: "package.json",
  // },
];

export const fileSystemWithIds = [
  {
    id: 1,

    name: "src",
    parentId: null,
    isActive: true,
    children: [
      {
        id: 2,

        name: "components",
        parentId: 1,
        isActive: true,
        children: [
          { id: 3, name: "Header.js", parentId: 2, isActive: true },
          { id: 4, name: "Footer.js", parentId: 2, isActive: true },
        ],
      },
      { id: 5, name: "index.js", parentId: 1, isActive: true },
      { id: 6, name: "App.js", parentId: 1, isActive: true },
    ],
  },
  {
    id: 7,

    name: "public",
    parentId: null,
    isActive: true,
    children: [
      { id: 8, name: "index.html", parentId: 7, isActive: true },
      { id: 9, name: "favicon.ico", parentId: 7, isActive: true },
    ],
  },
];
