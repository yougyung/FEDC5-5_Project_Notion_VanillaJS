/*
 * DocumentsList
 * - DocumentLinkButton / DocumentLinkButton / DocumentLinkButton ...
 * */

import DocumentLinkButton from '../DocumentLinkButton.js';
import { push } from '../../../utils/router.js';
import styleInJS from '../../../style/tagStyles.js';
import { getItem } from '../../../utils/storage.js';

export default function DocumentHeader({ $target, documentPath }) {
  const $documentHeader = document.createElement('div');
  styleInJS({ $target: $documentHeader, styleTagName: 'DocumentHeader' });

  $target.appendChild($documentHeader);

  $documentHeader.addEventListener('click', e => {
    const { type, id } = e.target.dataset;
    if (type === 'document') {
      if (id === 'null') push(`/`);
      else push(`/documents/${id}`);
    }
  });

  this.state = documentPath;
  this.setState = nextState => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $documentHeader.innerHTML = '';
    this.state.forEach((state, idx) => {
      if (state === null) return;

      const documentLinkButton = new DocumentLinkButton({
        $target: $documentHeader,
        title: state.title,
        documentId: state.id,
      });

      if (idx !== this.state.length - 1) {
        const split = document.createElement('span');
        split.textContent = ' / ';
        $documentHeader.appendChild(split);
      } else {
        const saveTitle = getItem(`SAVE_DOCUMENT_TITLE_KEY-${state.id}`);
        saveTitle && documentLinkButton.setState(saveTitle);
      }
    });
  };
}
