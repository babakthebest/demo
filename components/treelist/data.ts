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
  {
    type: "file",
    name: "package.json",
  },
];

export const fileSystemWithIds = [
  {
    id: 1,
    type: "folder",
    name: "src",
    parentId: null,
    children: [
      {
        id: 2,
        type: "folder",
        name: "components",
        parentId: 1,
        children: [
          { id: 3, type: "file", name: "Header.js", parentId: 2 },
          { id: 4, type: "file", name: "Footer.js", parentId: 2 },
        ],
      },
      { id: 5, type: "file", name: "index.js", parentId: 1 },
      { id: 6, type: "file", name: "App.js", parentId: 1 },
    ],
  },
  {
    id: 7,
    type: "folder",
    name: "public",
    parentId: null,
    children: [
      { id: 8, type: "file", name: "index.html", parentId: 7 },
      { id: 9, type: "file", name: "favicon.ico", parentId: 7 },
    ],
  },
  {
    id: 10,
    type: "file",
    name: "package.json",
    parentId: null,
  },
];
