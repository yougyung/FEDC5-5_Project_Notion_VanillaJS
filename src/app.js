import MatchedDocument from "./components/MatchedDocument.js";
import Posting from "./components/Posting.js";
import SideMenu from "./components/SideMenu.js";
import { request } from "./utils/api.js";
import { titleMatched } from "./utils/match.js";
import { initRouter, push } from "./utils/router.js";
import { findTitleInTree } from "./utils/tree.js";

export default function App({ $target }) {
  const $sideMenuContainer = document.createElement("div");
  const $postsContainer = document.createElement("div");
  const $linkContainer = document.createElement("div");
  $sideMenuContainer.className = "sideMenu";
  $target.appendChild($sideMenuContainer);
  $target.appendChild($postsContainer);
  $target.appendChild($linkContainer);

  this.state = {
    documentList: [],
    selectedDocumentId: "new",
    selectedDocumentContent: { id: "new", title: "", content: "" },
    isDocumentsLoading: false,
  };

  const sideMenu = new SideMenu({
    $target: $sideMenuContainer,
    initialState: {
      selectedDocumentId: this.state.selectedDocumentId,
      documentList: this.state.documentList,
    },
    onHeaderClick: async () => {
      push("/");
      this.setState({
        ...this.state,
        selectedDocumentId: "new",
      });

      await fetchSelectedDocument();
    },
    onSelect: async (documentId) => {
      push(`${documentId}`);
      this.setState({
        ...this.state,
        selectedDocumentId: documentId,
      });

      await fetchSelectedDocument();
      sideMenu.setState({
        selectedDocumentId: documentId,
        documentList: this.state.documentList,
      });
    },
    onPlusClick: async (parent) => {
      const res = await request("", {
        method: "POST",
        body: JSON.stringify({ title: "제목없음", parent }),
      });

      push(`${res.id}`);
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
    onEditing: (currentDocument) => {
      if (timer !== null) clearTimeout(timer);
      timer = setTimeout(async () => {
        const { id, title, content } = currentDocument;
        const isNew = this.state.selectedDocumentId === "new";
        const sameTitleDocument = findTitleInTree(
          this.state.documentList,
          title
        );

        if (sameTitleDocument && id !== sameTitleDocument.id) {
          titleMatched(sameTitleDocument.id, sameTitleDocument.title);
          matchedDocument.setState({
            matched: true,
            linkText: sameTitleDocument.title,
          });
          return;
        }

        if (title.length === 0) return; // title can't be empty string

        if (isNew) {
          const createdPost = await request("", {
            method: "POST",
            body: JSON.stringify({
              title,
              parent: null,
            }),
          });
          this.setState({ ...this.state, selectedDocumentId: createdPost.id });
          await fetchSelectedDocument();
          await fetchDocumentList();
          push(`${createdPost.id}`);
        } else {
          await request(`${id}`, {
            method: "PUT",
            body: JSON.stringify({
              title,
              content,
            }),
          });
          await fetchDocumentList();
        }

        matchedDocument.setState({
          ...this.state,
          matched: false,
        });
      }, 800);
    },
  });

  const matchedDocument = new MatchedDocument({
    $target: $linkContainer,
    initialState: { matched: false, linkText: "" },
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
    sideMenu.setState({
      selectedDocumentId: this.state.selectedDocumentId,
      documentList,
    });
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

  this.route = () => {
    const { pathname } = window.location;
    if (pathname.length > 1) {
      this.setState({
        ...this.state,
        selectedDocumentId: pathname.slice(1),
      });
    }
    fetchDocumentList();
    fetchSelectedDocument();
  };

  this.route();

  initRouter(this.route);
}
