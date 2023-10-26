/*
 * DeleteDocumentButton
 * - Button : 문서 지우기
 * */

import styleInJS from '../../style/tagStyles.js';

export default function DeleteDocumentButton({ $target, onDeleteDocument, isHidden }) {
  this.$addDocumentButton = document.createElement('button');
  this.$addDocumentButton.style.visibility = `${isHidden ? 'hidden' : 'visible'}`;
  styleInJS({ $target: this.$addDocumentButton, styleTagName: 'DeleteDocumentButton' });
  this.$addDocumentButton.textContent = 'x';

  this.$addDocumentButton.addEventListener('click', async e => {
    e.stopPropagation();
    onDeleteDocument();
  });

  $target.appendChild(this.$addDocumentButton);
}
