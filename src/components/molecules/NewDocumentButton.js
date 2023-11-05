/*
 * NewDocumentButton
 * - Button : 새 문서 만들기
 * */

import styleInJS from '../../style/tagStyles.js';

export default function NewDocumentButton({ $target, onCreateDocument, isHidden }) {
  this.$addDocumentButton = document.createElement('button');
  this.$addDocumentButton.style.visibility = `${isHidden ? 'hidden' : 'visible'}`;
  this.$addDocumentButton.style.width = `${isHidden ? '' : '100%'}`;
  styleInJS({ $target: this.$addDocumentButton, styleTagName: 'NewDocumentButton' });
  this.$addDocumentButton.textContent = '+';

  this.$addDocumentButton.addEventListener('click', e => {
    onCreateDocument();
  });

  $target.appendChild(this.$addDocumentButton);
}
