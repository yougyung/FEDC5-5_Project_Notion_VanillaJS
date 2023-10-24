export default function CommandList({ $target, onClose }) {
  const $commandList = document.createElement("div");
  $commandList.className = "command-list";

  $target.appendChild($commandList);

  $commandList.innerHTML = `
    <p class="modal-title">기본 블록</p>
    <ul class="modal-list">
        <li id="item" class="command">
        <p class="command">페이지 링크</p>
        <small class="command">기존 페이지를 링크하세요.</small>
        </li>
    </ul>
    `;

  $commandList.addEventListener("click", (event) => {
    const { target } = event;

    if (target.className === "command") {
      const $searchDocumentLink = document.createElement("input");
      $searchDocumentLink.style.display = "block";
      $searchDocumentLink.placeholder = "문서 제목을 입력하세요.";
      $target.parentNode.appendChild($searchDocumentLink);
      onClose();
    }

    event.stopPropagation();
  });

  return $commandList;
}
