export default function NoSubDocument({ $target, depth }) {
  const $noSubDocument = document.createElement("div");
  $target.appendChild($noSubDocument);
  $noSubDocument.classList.add(
    "no-sub-document",
    "document-children",
    "display-none"
  );
  $noSubDocument.style.paddingLeft = `${depth * 10 + 24}px`;
  this.render = () => {
    $noSubDocument.textContent = "하위문서 없음";
  };
  this.render();
}
