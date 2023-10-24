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
  document.addEventListener("mousedown", (e) => {
    const startX = e.clientX;
    const initialWidth = $nav.offsetWidth;
    if (Math.abs(startX - initialWidth) > 10) return;
    //마우스 다운시점의 시작 x좌표를 저장해 둠
    const onMouseMove = (e) => {
      const newX = e.clientX;
      const delta = newX - startX;
      const calculatedWidth = Math.max(250, initialWidth + delta); // 최소 너비를 250px로 설정
      $nav.style.width = `${calculatedWidth}px`;
    };
    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  });
  document.addEventListener("mousemove", (e) => {
    const startX = e.clientX;
    const initialWidth = $nav.offsetWidth;
    if (Math.abs(startX - initialWidth) > 10) {
      e.target.classList.remove("resize-cursor");
      $nav.classList.remove("thick-border");
    } else {
      e.target.classList.add("resize-cursor");
      $nav.classList.add("thick-border");
    }
  });
  this.render();
}
