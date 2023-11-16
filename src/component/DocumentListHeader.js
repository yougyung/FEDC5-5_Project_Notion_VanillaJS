import notionIcon from "../svg/notionIcon.js";

export default function DocumentListHeader({ $target }) {
  const $documentListHeader = document.createElement("header");
  $documentListHeader.classList.add("document-list-header");
  $target.appendChild($documentListHeader);
  this.render = () => {
    $documentListHeader.innerHTML = `
    ${notionIcon}
    <span>김영현의 노션</span>
    `;
  };
  this.render();
}
