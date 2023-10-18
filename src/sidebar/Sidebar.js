import { request } from "../api.js";
import DocumentList from "./DocumentList.js";
import SidebarHeader from "./SidebarHeader.js";

export default function Sidebar({ $target }) {
  const $sidebar = document.createElement("aside");
  $target.appendChild($sidebar);

  new SidebarHeader({
    $target: $sidebar,
    username: "Roto",
  });

  const documentList = new DocumentList({
    $target: $sidebar,
    initialState: [],
    onDelete: async (id) => {
      const documentIndex = this.state.findIndex(
        (document) => document.id === id
      );

      const nextDocuments = [...this.state];
      nextDocuments.splice(documentIndex, 1);

      // 낙관적 업데이트
      documentList.setState(nextDocuments);

      try {
        await request(`${id}`, {
          method: "DELETE",
        });
        console.log(id, ": 삭제 완료");
      } catch (error) {
        console.log(error);
        documentList.setState(this.state);
      }
    },
  });

  const fetchDocuments = async () => {
    const documents = await request("");

    this.state = documents;
    documentList.setState(documents);
  };

  fetchDocuments();
}
