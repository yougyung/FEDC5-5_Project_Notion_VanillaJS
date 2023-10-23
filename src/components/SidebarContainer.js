import DocumentList from "./DocumentList.js";
import { fetchDocuments, request } from "../utils/api.js";
import { DOCUMENTS_ROUTE } from "../utils/constants.js";

export default function SidebarContainer({ $target }) {
  const $sidebar = document.createElement("div");
  $sidebar.className = "sidebar";

  $target.appendChild($sidebar);

  const documentList = new DocumentList({
    $target: $sidebar,
    initialState: [],
    onRemove: async (documentId) => {
      await fetchDocuments(documentId, {
        method: "DELETE",
      });
      this.render();
    },
  });

  this.render = async () => {
    const document = await fetchDocuments(null);
    documentList.setState(document);
  };

  this.render();
}
