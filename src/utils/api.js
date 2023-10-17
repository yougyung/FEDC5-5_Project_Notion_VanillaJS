export const API_END_POINT = "https://kdt-frontend.programmers.co.kr";
export const DEFAULT_USERNAME = "ksj-notion-cloning";

// 일단 더미데이터로 실험해보고 이후에 API 연결하기
export const DUMMY_DATA = [
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
        ],
      },
    ],
  },
  {
    id: 4,
    title: "hello!",
    documents: [],
  },
];

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
