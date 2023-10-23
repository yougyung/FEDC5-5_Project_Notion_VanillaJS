/*
 * NotionTitle
 * - Title : notion 이름
 * */
import { push } from '../../utils/router.js';

export default function NotionTitle({ $target, title }) {
  const $notionTitle = document.createElement('h1');
  $notionTitle.textContent = title;
  $notionTitle.addEventListener('click', e => {
    e.preventDefault();
    push('/');
  });
  $target.appendChild($notionTitle);
}
