/*
 * DocumentsList
 * - DocumentObject
 *  - DocumentObject
 *  - ...
 * - DocumentObject
 * - ...
 * - NewDocumentButton
 * */
import DocumentObject from './DocumentObject.js';

export default function DocumentsList({ $target, initialState, parentId = null }) {
  const $documentsList = document.createElement('ul');
  $target.appendChild($documentsList);

  this.state = initialState;

  this.setState = nextState => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $documentsList.innerHTML = '';
    this.state.forEach(state => {
      const $details = document.createElement('details');
      new DocumentObject({ $target: $details, currentDocumentData: { ...state, parentId } });
      $documentsList.appendChild($details);
      if (state.documents.length) {
        new DocumentsList({ $target: $details, initialState: state.documents, parentId: state.id });
      } else {
        const $span = document.createElement('span');
        $span.setAttribute('data-type', 'document');
        $span.textContent = '하위 페이지가 없습니다.';
        $details.appendChild($span);
      }
    });
  };

  this.render();
}
