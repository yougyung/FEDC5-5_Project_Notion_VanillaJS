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
import { getItem } from '../../utils/storage.js';
import styleInJS from '../../style/tagStyles.js';

export default function DocumentsList({ $target, initialState }) {
  const $documentsList = document.createElement('ul');
  styleInJS({ $target: $documentsList, styleTagName: 'DocumentsList' });
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

      const openIds = getItem('openDocumentIds')?.map(Number);
      openIds?.includes(state.id) && $details.setAttribute('open', 'true');

      new DocumentObject({
        $target: $details,
        currentDocumentData: { title: state.title, id: state.id },
      });

      $documentsList.appendChild($details);
      if (state.documents.length) {
        new DocumentsList({ $target: $details, initialState: state.documents });
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
