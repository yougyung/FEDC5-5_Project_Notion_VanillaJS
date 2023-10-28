import Sidebar from "../layout/Sidebar.js";
import EditDocument from "../layout/EditDocument.js";
import {
  getAllDocumentLists,
  getDocumentContent,
  createDocument,
  updateDocument,
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
    const selectedDocument = await getDocumentContent(documentId);
    this.setState({
      ...this.state,
      selectedDocument,
    });
    editDocument.setState(this.state);
  };

  /** 새로운 문서 생성하기 */
  const addNewDocument = async (parentId) => {
    // 새 문서 생성
    const newDocument = await createDocument({
      title: "제목 없음",
      parent: parentId,
    });

    // 부모 문서의 최신 정보 가져오기
    const parentDocument = await getDocumentContent(parentId);

    // 새 문서를 부모 문서의 하위로 추가
    parentDocument.documents.push(newDocument);

    // 사이드바를 업데이트하기 위해 최신 문서 목록 가져오기
    await fetchDocumentLists();

    // 부모 문서부터 최상위 문서까지 토글 열기
    let $parentDocument = document.querySelector(`[data-id="${parentId}"]`);

    while ($parentDocument) {
      const $leafDocuments = $parentDocument.querySelector(
        ".side-bar-leaf-documents"
      );
      $leafDocuments.style.display = "block";
      $parentDocument =
        $parentDocument.parentElement.closest(".side-bar-document");
    }

    this.setState({ ...this.state, selectedDocument: newDocument });
    editDocument.setState(this.state);
  };

  const init = async () => {
    await fetchDocumentLists();
  };

  // Sidebar
  const sidebar = new Sidebar({
    $target,
    initialState: this.state.documents,
    addNewDocument,
    fetchDocument,
  });

  // EditorDocument
  const editDocument = new EditDocument({
    $target,
    initialState: this.state,
  });

  init();
}
