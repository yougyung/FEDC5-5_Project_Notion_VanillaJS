import DocumentList from '../components/Sidebar/DocumentList.js';

export default function Sidebar({ $target, initialState, onDocumentClick }) {
  const $sidebar = document.createElement('div');
  $target.appendChild($sidebar);

  // DocumentList 컴포넌트로부터 document의 Id를 받아와 isFolded 상태 변경, 최상위 컴포넌트에 전달
  this.toggleIsFolded = (documents, targetId) => {
    return documents.map((document) => ({
      ...document,
      isFolded:
        document.id === targetId ? !document.isFolded : document.isFolded,
      documents: this.toggleIsFolded(document.documents || [], targetId),
    }));
  };

  const documentList = new DocumentList({
    $target: $sidebar,
    initialState,
    onDocumentClick: (id) => {
      const nextState = this.toggleIsFolded(this.state, id);
      onDocumentClick(nextState);
    },
  });

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    documentList.setState(this.state);
  };
}
