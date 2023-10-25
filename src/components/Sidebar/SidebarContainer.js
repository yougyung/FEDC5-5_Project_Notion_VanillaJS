import DocumentList from "./DocumentList.js";
import { fetchDocuments, request } from "../../utils/api.js";
import DocumentAddButton from "./DocumentAddButton.js";

export default function SidebarContainer({ $target, onAdd, onDelete }) {
  const $sidebar = document.createElement("div");
  $sidebar.className = "sidebar";

  $target.appendChild($sidebar);

  const documentList = new DocumentList({
    $target: $sidebar,
    initialState: {
      documents: [],
    },
    onAdd,
    onDelete,
  });

  new DocumentAddButton({
    // DocumentList 아래 페이지 추가 버튼
    $target: $sidebar,
    initialState: {
      position: "document-list-bottom",
      text: "페이지 추가",
    },
    onAdd,
  });

  new DocumentAddButton({
    // 사이드바 가장 아래 페이지 추가 버튼
    $target: $sidebar,
    initialState: {
      position: "sidebar-bottom",
      text: "새 페이지",
    },
    onAdd,
  });

  this.render = async () => {
    const documents = await fetchDocuments(null);
    documentList.setState({ documents });
  };

  this.render();
}
