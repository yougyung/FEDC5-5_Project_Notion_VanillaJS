/*
 * DocumentLinkButton
 * - LinkButton : 해당 문서로 이동
 * */
export default function DocumentLinkButton({ $target, title, documentId }) {
  const $title = document.createElement('span');
  $title.textContent = title;
  $title.setAttribute('data-id', documentId);
  $title.setAttribute('data-type', 'document');
  $target.appendChild($title);
}
