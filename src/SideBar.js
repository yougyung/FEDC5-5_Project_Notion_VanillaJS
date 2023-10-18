import SideBarHeader from "./SideBarHeader.js";
import SideBarList from "./SideBarList.js";
import { request } from "./utils/api.js";

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
  $sideBar.className = "sidebar";

  const sideBarHeader = new SideBarHeader({ $target: $sideBar });
  const sideBarList = new SideBarList({ $target: $sideBar, initialState: [] });

  this.setState = async () => {
    const res = await request("/documents");
    // sideBarList.setState(res)
    sideBarList.setState(DUMMY_DOCUMENTS_LIST); // 개발 초기 더미데이터 이용
    this.render();
  };
  this.render = () => {
    $target.appendChild($sideBar);
  };
}
