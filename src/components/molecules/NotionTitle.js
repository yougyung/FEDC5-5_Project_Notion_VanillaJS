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
  $target.appendChild($notionTitle);

  $notionTitle.addEventListener('click', e => {
    push('/');
  });
}
