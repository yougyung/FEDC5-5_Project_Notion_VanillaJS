import { request } from "../utils/api.js";
import Documents from "./Documents.js";
import Header from "./Header.js";
import Title from "./Title.js";

export default function Sidebar({ $target }) {
  const $sidebar = document.createElement("aside");
  $sidebar.className = "sidebar";

  // 헤더를 만들건데, 만약 로컬스토리지에 먼가 있따? 바로 삭제.
  new Title({
    $target: $sidebar,
  });

  new Header({
    $target: $sidebar,
    text: "개인 페이지",
  });

  const documents = new Documents({
    $target: $sidebar,
    initialState: "",
    onDeleteDocument: () => {
      this.setState();
    },
  });

  this.setState = async () => {
    const response = await request("/documents");
    documents.setState(response);
    this.render();
  };

  this.setState();

  this.render = () => {
    $target.appendChild($sidebar);
  };
}
