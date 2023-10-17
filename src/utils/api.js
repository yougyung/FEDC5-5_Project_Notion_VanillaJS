export const API_END_POINT = "https://kdt-frontend.programmers.co.kr";
export const DEFAULT_USERNAME = "ksj-notion-cloning";

// 일단 더미데이터로 실험해보고 이후에 API 연결하기
export const DUMMY_DATA_SIDE_LIST = [
  {
    id: 1, // Document id
    title: "노션을 만들자", // Document title
    documents: [
      {
        id: 2,
        title: "블라블라",
        documents: [
          {
            id: 3,
            title: "함냐함냐",
            documents: [],
          },
          {
            id: 100,
            title: "hello!",
            documents: [],
          },
        ],
      },
      { id: 4, title: "함블함블", documents: [] },
    ],
  },
  {
    id: 5,
    title: "hello!",
    documents: [],
  },
  {
    id: 6,
    title: "hello!2",
    documents: [],
  },
];

export const DUMMY_DATA_TEXT_CONTENT = {
  id: 1,
  title: "노션을 만들자",
  content: "즐거운 자바스크립트의 세계!",
  documents: [
    {
      id: 2,
      title: "",
      createdAt: "",
      updatedAt: "",
    },
  ],
  createdAt: "",
  updatedAt: "",
};

export const request = async (url) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      headers: {
        "Content-Type": "application/json",
        "x-username": `${DEFAULT_USERNAME}`,
      },
    });
    if (res.ok) {
      return await res.json();
    }
    throw new Error("API 처리 중 오류 발생!!");
  } catch (error) {
    alert(error.message);
  }
};
