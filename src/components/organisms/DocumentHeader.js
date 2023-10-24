/*
 * DocumentsList
 * - DocumentPath + SettingButton
 * */

import DocumentLinkButton from '../molecules/DocumentLinkButton.js';
import { push } from '../../utils/router.js';

export default function DocumentHeader({ $target, documentPath }) {
  const $documentHeader = document.createElement('div');
  $documentHeader.style.width = '100%';
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
      if (state === null) new DocumentLinkButton({ $target: $documentHeader, title: '첫 화면', documentId: null });
      else new DocumentLinkButton({ $target: $documentHeader, title: state.title, documentId: state.id });

      if (idx !== this.state.length - 1) {
        const split = document.createElement('span');
        split.textContent = ' > ';
        $documentHeader.appendChild(split);
      }
    });
  };
}
