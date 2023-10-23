/*
 * DocumentDetail
 * - DocumentHeader
 * - EditDocument
 */

import DocumentHeader from '../organisms/DocumentHeader.js';
import EditDocument from '../organisms/EditDocument.js';

export default function DocumentDetail({ $target, documentState }) {
  const $documentDetail = document.createElement('div');
  $documentDetail.style.width = '100%';
  $documentDetail.style.display = 'flex';
  $documentDetail.style.flexDirection = 'column';
  $target.appendChild($documentDetail);

  this.state = documentState;
  this.setState = nextState => {
    if (nextState === null) {
      $documentDetail.innerHTML = "<h1>Hun's Notion에 오신걸 환영합니다.</h1>";
      return;
    }
    this.state = nextState;
    // documentHeader.setState();
    editDocument.setState(nextState);
  };

  // const documentHeader = new DocumentHeader({ $target: $documentDetail, documentPath: this.state.documentPath });
  const editDocument = new EditDocument({
    $target: $documentDetail,
    initialState: { id: documentState.id, title: documentState.title, content: documentState.content },
  });
}
