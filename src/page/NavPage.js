import Button from "../common/Button.js";
import DocumentList from "../component/DocumentList.js";
import plusIcon from "../svg/plusIcon.js";
import { request } from "../utils/api.js";
import { push } from "../utils/router.js";
import Storage from "../utils/storage.js";

//initialState = [{id:num, title:string, documents:array }]
export default function NavPage({ $target }) {
  const $nav = document.createElement("nav");
  //항상 존재해야하는 컴포넌트라서, 내부에서 타겟에 붙여주었다.
  $target.prepend($nav);
  //문서 리스트를 가져온다.
  this.getDocuments = async () => {
    const documentsTree = await request("/documents");
    documentList.setState(documentsTree);
  };
  const createDocument = async (id = null) => {
    const body = { title: "제목 없음", parent: id };
    const response = await request("/documents", {
      method: "POST",
      body: JSON.stringify(body),
    });
    console.log(response);
    this.getDocuments();
    push(`/documents/${response.id}`);
    return response;
  };
  const removeDocument = async (id) => {
    await request(`/documents/${id}`, {
      method: "DELETE",
    });
    this.getDocuments();
    push("/");
  };
  let documentList = null;
  this.getDocuments();
  this.render = () => {
    documentList = new DocumentList({
      $target: $nav,
      initialState: [{ id: null, title: "", documents: [] }],
      createDocument,
      removeDocument,
    });
    new Button({
      $target: $nav,
      content: `${plusIcon} <span>페이지 추가</span>`,
      attributes: [{ name: "class", value: "add-root-doc-btn" }],
      onClick: async () => {
        const response = await createDocument();
        console.log(response);
        const storage = new Storage(window.localStorage);
        storage.setItem(response.id, { isFolded: true });
      },
    });
  };
  this.render();
}
