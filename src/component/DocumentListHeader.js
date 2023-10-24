import notionIcon from "../svg/notionIcon.js";

export default function DocumentListHeader({ $target }) {
  const $documentListHeader = document.createElement("header");
  $target.appendChild($documentListHeader);
  $documentListHeader.classList.add("document-list-header");
  this.render = () => {
    $documentListHeader.innerHTML = `
    ${notionIcon}
    <span>김영현의 노션</span>
    `;
  };
  this.render();
}
