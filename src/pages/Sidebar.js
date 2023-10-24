import DocumentList from '../components/Sidebar/DocumentList.js';
import SidebarHeader from '../components/Sidebar/SidebarHeader.js';

export default function Sidebar({
  $target,
  initialState = [],
  onDocumentFoldToggle,
  onDocumentAdded,
  onDocumentClick,
}) {
  const $sidebar = document.createElement('div');
  $target.appendChild($sidebar);
  $sidebar.className = 'sidebar';

  this.state = initialState;

  const sidebarHeader = new SidebarHeader({
    $target: $sidebar,
    onDocumentAdded: (documentId) => {
      onDocumentAdded(documentId);
    },
  });

  const documentList = new DocumentList({
    $target: $sidebar,
    initialState,
    onDocumentFoldToggle: (documentId) => {
      const nextState = this.toggleIsFolded(this.state, documentId);
      this.setState(nextState);
      onDocumentFoldToggle(nextState);
    },
    onDocumentAdded: (documentId) => {
      onDocumentAdded(documentId);
    },
    onDocumentClick: (documentId) => {
      onDocumentClick(documentId);
    },
  });

  this.setState = (nextState) => {
    this.state = nextState;
    documentList.setState(this.state);
  };

  // DocumentList 컴포넌트로부터 document의 Id를 받아와 isFolded 상태 변경, 최상위 컴포넌트에 전달
  this.toggleIsFolded = (documents, targetId) => {
    return documents.map((document) => ({
      ...document,
      isFolded:
        document.id === targetId ? !document.isFolded : document.isFolded,
      documents: this.toggleIsFolded(document.documents || [], targetId),
    }));
  };
}
