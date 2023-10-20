/*
 * NewDocumentButton
 * - Button : 새 문서 만들기
 * */

export default function NewDocumentButton({ $target, parentId }) {
  this.$addDocumentButton = document.createElement('button');
  this.$addDocumentButton.style.visibility = 'hidden';
  this.$addDocumentButton.textContent = '+';
  $target.appendChild(this.$addDocumentButton);
}
