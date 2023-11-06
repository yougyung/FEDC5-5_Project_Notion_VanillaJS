/*
 * NewDocumentButton
 * - Button : 새 문서 만들기
 * */

import createDOM from '../../utils/createDOM.js';

export default function NewDocumentButton({ $target, onCreateDocument, isFullSize = false }) {
  this.$addDocumentButton = createDOM({
    $target,
    tagName: 'button',
    content: '+',
    style: 'NewDocumentButton',
  });
  this.$addDocumentButton.style.width = `${isFullSize ? '100%' : ''}`;

  this.$addDocumentButton.addEventListener('click', e => {
    onCreateDocument();
  });
}
