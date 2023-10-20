/*
 * NotionTitle
 * - Title : notion 이름
 * */
export default function NotionTitle({ $target, title }) {
  const $notionTitle = document.createElement('h1');
  $notionTitle.textContent = title;
  $target.appendChild($notionTitle);
}
