/*
 * DeleteDocumentButton
 * - Button : 문서 지우기
 * */

import { request } from '../../services/api.js';
import { push } from '../../utils/router.js';

export default function DeleteDocumentButton({ $target, onDeleteDocument, isHidden }) {
  this.$addDocumentButton = document.createElement('button');
  this.$addDocumentButton.style.visibility = `${isHidden ? 'hidden' : 'visible'}`;
  this.$addDocumentButton.textContent = 'x';

  this.$addDocumentButton.addEventListener('click', async e => {
    e.stopPropagation();
    onDeleteDocument();
  });

  $target.appendChild(this.$addDocumentButton);
}
