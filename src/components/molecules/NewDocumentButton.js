/*
 * NewDocumentButton
 * - Button : 새 문서 만들기
 * */

export default function NewDocumentButton({ $target, onCreateDocument, isHidden }) {
  this.$addDocumentButton = document.createElement('button');
  this.$addDocumentButton.style.visibility = `${isHidden ? 'hidden' : 'visible'}`;
  this.$addDocumentButton.textContent = '+';
  this.$addDocumentButton.addEventListener('click', e => {
    e.stopPropagation();
    onCreateDocument();
  });

  $target.appendChild(this.$addDocumentButton);
}
