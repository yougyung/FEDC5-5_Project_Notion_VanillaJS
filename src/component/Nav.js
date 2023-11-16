import Button from "../common/Button.js";
import DocumentList from "./DocumentList.js";
import DocumentListHeader from "./DocumentListHeader.js";
import plusIcon from "../svg/plusIcon.js";
import { request } from "../utils/api.js";
import { push } from "../utils/handleRouteEvent.js";
import Storage from "../utils/storage.js";
import { observer, store } from "../main.js";
import { fetchDocumentsAsync } from "../modules/documentsDuck.js";

//initialState = [{id:num, title:string, documents:array }]
export default function Nav({ $target }) {
  const $nav = document.createElement("nav");
  //항상 존재해야하는 컴포넌트라서, 내부에서 타겟에 붙여주었다.
  $target.prepend($nav);
  //문서 리스트를 가져온다.
  this.getDocuments = async () => {
    store.dispatch(fetchDocumentsAsync());
  };
  const createDocument = async (id = null) => {
    const body = { title: "제목 없음", parent: id };
    const response = await request("/documents", {
      method: "POST",
      body: JSON.stringify(body),
    });
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
    const data = store.useSelector(
      (state) => state.documentsReducer,
      this.render
    );
    $nav.innerHTML = "";
    new DocumentListHeader({ $target: $nav });
    documentList = new DocumentList({
      $target: $nav,
      initialState: data.documents,
      createDocument,
      removeDocument,
    });
    new Button({
      $target: $nav,
      content: `${plusIcon} <span>페이지 추가</span>`,
      attributes: [{ name: "class", value: "add-root-doc-btn" }],
      onClick: async () => {
        const response = await createDocument();
        const storage = new Storage(window.localStorage);
        storage.setItem(response.id, { isFolded: true });
      },
    });
  };

  const maxNavWidth = 500;
  const minNavWidth = 250;
  const gap = 15;
  document.addEventListener("mousedown", (e) => {
    //마우스 다운시점의 시작 x좌표와, nav바의 너비를 저장해둠.
    const startX = e.clientX;
    const initialWidth = $nav.offsetWidth;
    if (Math.abs(startX - initialWidth) > gap) return;
    const onMouseMove = (e) => {
      const newX = e.clientX;
      const delta = newX - startX;
      const calculatedWidth = Math.max(minNavWidth, initialWidth + delta); // 최소 너비를 250px로 설정
      //최대너비는 500px
      if (calculatedWidth >= maxNavWidth) {
        $nav.style.width = `${calculatedWidth}px`;
        //크기를 더 키우려하면(클릭 시점보다 움직인 좌표가 양수면)
        if (startX < newX) {
          onMouseUp();
        }
      } else {
        $nav.style.width = `${calculatedWidth}px`;
      }
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
    if (Math.abs(startX - initialWidth) > gap) {
      document.body.classList.remove("resize-cursor");
      $nav.classList.remove("resize-cursor");
      $nav.classList.remove("thick-border");
    } else {
      document.body.classList.add("resize-cursor");
      $nav.classList.add("thick-border");
    }
  });
  this.render();
}
