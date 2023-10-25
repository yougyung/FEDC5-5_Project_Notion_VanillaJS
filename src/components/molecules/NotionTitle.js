/*
 * NotionTitle
 * - Title : notion 이름
 * */
import { push } from '../../utils/router.js';
import styleInJS from '../../style/tagStyles.js';

export default function NotionTitle({ $target, title }) {
  const $notionTitle = document.createElement('h1');
  $notionTitle.textContent = title;
  styleInJS({ $target: $notionTitle, styleTagName: 'NotionTitle' });
  $notionTitle.addEventListener('click', e => {
    e.preventDefault();
    e.stopPropagation();
    push('/');
  });
  $target.appendChild($notionTitle);
}
