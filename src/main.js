import App from "./App.js";
import { request, updateDocument } from "./utils/api.js";

const $target = document.querySelector("#app");
new App({ $target });

// *********************************************************
// 아래는 서버 데이터 조작 코드
// const deleteAllDocs = async () => {
//   const response = await request("/documents");
//   for (const key in response) {
//     const { id } = response[key];
//     deleteDocument(id);
//   }
// };
// deleteAllDocs();

// insertDocument({
//   title: "냐옹냐옹",
//   parent: 107948,
// });

// const searchData = async () => {
//   const response = await request("/documents");
//   console.log(response);
// };
// searchData();

// updateDocument({
//   id: 111762,
//   title: "A",
//   content: "aa",
// });

// put으로 created time을 조종하면 렌더트리 구조가 변경될까?
