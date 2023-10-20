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

  this.setState = nextState => {
    // documentHeader.setState();
    editDocument.setState(nextState);
  };

  // const documentHeader = new DocumentHeader({ $target: $documentDetail, documentPath: this.state.documentPath });
  const editDocument = new EditDocument({
    $target: $documentDetail,
    initialState: { title: documentState.title, content: documentState.content },
  });
}
