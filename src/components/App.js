import Sidebar from "../layout/Sidebar.js";
import EditDocument from "../layout/EditDocument.js";
import {
  getAllDocumentLists,
  getDocumentContent,
  createDocument,
} from "../api/document.js";

export default function App({ $target }) {
  this.state = {
    documents: [], // sidebar 문서 목록
    selectedDocument: {
      id: 0,
      title: "",
      createdAt: "",
      updatedAt: "",
    }, // editor에 보여줄 특정 문서
  };

  this.setState = (nextState) => {
    this.state = nextState;
  };

  /** 문서 목록 가져오기: state 변경, 사이드바 리렌더링 */
  const fetchDocumentLists = async () => {
    const documents = await getAllDocumentLists();

    this.setState({
      ...this.state,
      documents,
    });

    sidebar.setState(this.state.documents);
  };

  /** 선택된 문서 가져오기 */
  const fetchDocument = async (documentId) => {
    const selectedDocument = await getPost(documentId);
    this.setState({
      ...this.state,
      selectedDocument,
    });
  };

  /** 새로운 문서 생성하기 */
  const onAddNewDocument = async (parentId) => {
    const newDocument = await createDocument({
      title: "제목없음",
      parent: parentId,
    });

    console.log(newDocument);
    const newDocumentBody = await getDocumentContent(newDocument.id);
  };

  const init = async () => {
    await fetchDocumentLists();
  };

  // Sidebar
  const sidebar = new Sidebar({
    $target,
    initialState: this.state.documents,
    onAddNewDocument,
  });

  // EditorDocument
  const editDocument = new EditDocument({
    $target,
    initialState: this.state,
  });

  init();
}
