import Posting from "./components/Posting.js";
import SideMenu from "./components/SideMenu.js";
import { request } from "./utils/api.js";

export default function App({ $target }) {
  const $sideMenuContainer = document.createElement("div");
  const $postsContainer = document.createElement("div");

  this.state = {
    documentList: [],
    selectedDocument: null,
    isDocumentsLoading: false,
  };

  $target.appendChild($sideMenuContainer);
  $target.appendChild($postsContainer);

  const sideMenu = new SideMenu({
    $target: $sideMenuContainer,
    initialState: this.state.documentList,
    onSelect: async (document) => {
      history.pushState(null, null, `?selectedDocument=${document}`);
      this.setState({
        ...this.state,
        selectedDocument: document,
      });
      await fetchSelectedDocument();
    },
  });

  const posting = new Posting({
    $target: $postsContainer,
    initialState: this.state.selectedDocument,
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
    // console.log(documentList);
    // console.log(this.state);
  };

  const fetchSelectedDocument = async () => {
    const { selectedDocument } = this.state;
    if (selectedDocument) {
      this.setState({ ...this.state, isDocumentsLoading: true });
      const currentDocument = await request(selectedDocument);
      this.setState({
        ...this.state,
        selectedDocument: currentDocument,
        isDocumentsLoading: false,
      });
      posting.setState(currentDocument);
    }
  };

  fetchDocumentList();
  fetchSelectedDocument();
}
