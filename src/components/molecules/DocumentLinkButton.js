/*
 * DocumentLinkButton
 * - LinkButton : 해당 문서로 이동
 * */
import styleInJS from '../../style/tagStyles.js';

export default function DocumentLinkButton({ $target, title, documentId }) {
  const $title = document.createElement('span');
  styleInJS({ $target: $title, styleTagName: 'DocumentLinkButton' });
  $title.textContent = title;
  $title.setAttribute('data-id', documentId);
  $title.setAttribute('data-type', 'document');
  $target.appendChild($title);
}
