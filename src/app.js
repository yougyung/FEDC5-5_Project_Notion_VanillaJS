import Posting from "./components/Posting.js";
import SideMenu from "./components/SideMenu.js";
import { request } from "./utils/api.js";

export default function App({ $target }) {
  const $sideMenuContainer = document.createElement("div");
  const $postsContainer = document.createElement("div");

  this.state = {
    documentList: [],
    selectedDocumentId: "new",
    selectedDocumentContent: { id: "new", title: "", content: "" },
    isDocumentsLoading: false,
  };

  $target.appendChild($sideMenuContainer);
  $target.appendChild($postsContainer);

  const sideMenu = new SideMenu({
    $target: $sideMenuContainer,
    initialState: this.state.documentList,
    onHeaderClick: async () => {
      history.replaceState(null, null, "/");
      this.setState({
        ...this.state,
        selectedDocumentId: "new",
      });

      await fetchSelectedDocument();
    },
    onSelect: async (documentId) => {
      history.replaceState(null, null, `${documentId}`);
      this.setState({
        ...this.state,
        selectedDocumentId: documentId,
      });
      await fetchSelectedDocument();
    },
    onPlusClick: async (parent) => {
      const res = await request("", {
        method: "POST",
        body: JSON.stringify({ title: "제목없음", parent }),
      });
      history.replaceState(null, null, `${res.id}`);
      this.setState({
        ...this.state,
        selectedDocumentId: res.id,
      });
      await fetchSelectedDocument();
      await fetchDocumentList();
      document.getElementsByTagName("input")[0].select();
    },
    onDeleteClick: async (documentId) => {
      await request(documentId, { method: "DELETE" });
      await fetchDocumentList();
    },
  });

  let timer = null;

  const posting = new Posting({
    $target: $postsContainer,
    initialState: this.state.selectedDocumentContent,
    onEditing: (document) => {
      if (timer !== null) clearTimeout(timer);
      timer = setTimeout(async () => {
        const isNew = this.state.selectedDocumentId === "new";
        if (isNew) {
          if (document.title.length === 0) return;
          const createdPost = await request("", {
            method: "POST",
            body: JSON.stringify({
              title: document.title,
              parent: null,
            }),
          });
          this.setState({ ...this.state, selectedDocumentId: createdPost.id });
          await fetchSelectedDocument();
          await fetchDocumentList();
          history.replaceState(null, null, `${createdPost.id}`);
        } else {
          await request(`${document.id}`, {
            method: "PUT",
            body: JSON.stringify({
              title: document.title,
              content: document.content,
            }),
          });
          await fetchDocumentList();
        }
      }, 1000);
    },
  });

  this.setState = (nextstate) => {
    this.state = nextstate;
  };

  const fetchDocumentList = async () => {
    const documentList = await request();
    this.setState({
      ...this.state,
      documentList,
    });
    sideMenu.setState(documentList);
  };

  const fetchSelectedDocument = async () => {
    const { selectedDocumentId } = this.state;
    if (selectedDocumentId !== "new") {
      this.setState({ ...this.state, isDocumentsLoading: true });
      const currentDocument = await request(selectedDocumentId);
      this.setState({
        ...this.state,

        selectedDocumentContent: currentDocument,
        isDocumentsLoading: false,
      });
      posting.setState(currentDocument);
    } else {
      posting.setState({ id: "new", title: "", content: "" });
    }
  };

  fetchDocumentList();
  fetchSelectedDocument();
}
