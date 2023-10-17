import SideBarList from "./SideBarList.js";
import { request } from "./utils/api.js";
import {
  localStorageGetItem,
  localStorageSetItem,
  localStorageSetIsOpen,
} from "./utils/storage.js";

const DUMMY_DOCUMENTS_LIST = [
  {
    id: 1, // Document id
    title: "노션을 만들자1", // Document title
    createdAt: "2023-07-13T05:15:33.223Z",
    updatedAt: "2023-07-13T05:15:33.223Z",
    documents: [
      {
        id: 2,
        title: "블라블라2",
        createdAt: "2023-07-13T05:15:33.223Z",
        updatedAt: "2023-07-13T05:15:33.223Z",
        documents: [
          {
            id: 3,
            title: "함냐함냐3",
            createdAt: "2023-07-13T05:15:33.223Z",
            updatedAt: "2023-07-13T05:15:33.223Z",
            documents: [
              {
                id: 5,
                title: "hel555lo!",
                createdAt: "2023-07-13T05:15:33.223Z",
                updatedAt: "2023-07-13T05:15:33.223Z",
                documents: [],
              },
            ],
          },
          {
            id: 7,
            title: "함냐777함냐",
            createdAt: "2023-07-13T05:15:33.223Z",
            updatedAt: "2023-07-13T05:15:33.223Z",
            documents: [
              {
                id: 8,
                title: "ttt888!",
                createdAt: "2023-07-13T05:15:33.223Z",
                updatedAt: "2023-07-13T05:15:33.223Z",
                documents: [],
              },
            ],
          },
        ],
      },
      {
        id: 9,
        title: "글999냐",
        createdAt: "2023-07-13T05:15:33.223Z",
        updatedAt: "2023-07-13T05:15:33.223Z",
        documents: [
          {
            id: 10,
            title: "열번쨰잉!",
            createdAt: "2023-07-13T05:15:33.223Z",
            updatedAt: "2023-07-13T05:15:33.223Z",
            documents: [],
          },
        ],
      },
    ],
  },
  {
    id: 4,
    title: "hello!4",
    createdAt: "2023-07-13T05:15:33.223Z",
    updatedAt: "2023-07-13T05:15:33.223Z",
    documents: [],
  },
];

export default function SideBar({ $target }) {
  const $sideBar = document.createElement("div");
  $target.appendChild($sideBar);

  const sideBarList = new SideBarList({ $target: $sideBar, initialState: [] });

  const fetchDocuments = async () => {
    const documents = await request("/documents");
    console.log("GET", documents);

    sideBarList.setState(DUMMY_DOCUMENTS_LIST); // 더미데이터로 전환
  };
  this.render = async () => {
    const isOpen = localStorageGetItem("isOpen", []);
    if (isOpen.length === 0) {
      localStorageSetItem("isOpen", []);
    }
    await fetchDocuments();
  };
  this.render();
}
