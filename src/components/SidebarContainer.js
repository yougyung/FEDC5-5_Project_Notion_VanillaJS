import DocumentList from "./DocumentList.js";
import { fetchDocuments, request } from "../utils/api.js";
import { DOCUMENTS_ROUTE, NEW_PARENT, NEW } from "../utils/constants.js";
import DocumentAddButton from "./DocumentAddButton.js";
import { setItem } from "../utils/storage.js";
import { push } from "../utils/router.js";

export default function SidebarContainer({ $target }) {
  const $sidebar = document.createElement("div");
  $sidebar.className = "sidebar";

  $target.appendChild($sidebar);

  const documentList = new DocumentList({
    $target: $sidebar,
    initialState: {
      documents: [],
    },
    onRemove: async (documentId) => {
      if (confirm("페이지를 삭제하시겠습니까?")) {
        await fetchDocuments(documentId, {
          method: "DELETE",
        });
        this.render();
        // TODO: 로컬스토리지의 opened-item에서 해당 id 삭제해야 함
      }
    },
  });

  new DocumentAddButton({
    // DocumentList 아래 페이지 추가 버튼
    $target: $sidebar,
    initialState: {
      position: "document-list-bottom",
      text: "페이지 추가",
    },
    onClick: () => {
      setItem(NEW_PARENT, null);
      push(`${DOCUMENTS_ROUTE}/${NEW}`);
    },
  });

  new DocumentAddButton({
    // 사이드바 가장 아래 페이지 추가 버튼
    $target: $sidebar,
    initialState: {
      position: "sidebar-bottom",
      text: "새 페이지",
    },
    onClick: () => {
      setItem(NEW_PARENT, null);
      push(`${DOCUMENTS_ROUTE}/${NEW}`);
    },
  });

  this.render = async () => {
    const documents = await fetchDocuments(null);
    documentList.setState({ documents });
  };

  this.render();
}
