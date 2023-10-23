import Button from "../common/Button.js";
import DocumentList from "../component/DocumentList.js";
import { request } from "../utils/api.js";
import { push } from "../utils/router.js";

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
  this.createDocument = async (id) => {
    const body = { title: "제목 없음", parent: id ? id : null };
    const response = await request("/documents", {
      method: "POST",
      body: JSON.stringify(body),
    });
    this.getDocuments();
    console.log("문서 생성됨", response);
  };
  this.removeDocument = async (id) => {
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
      createDocument: this.createDocument,
      removeDocument: this.removeDocument,
    });
    new Button({
      $target: $nav,
      content: "새 페이지 추가하기",
      attributes: [{ name: "class", value: "add-root-doc-btn" }],
      onClick: this.createDocument,
    });
  };
  this.render();
}
