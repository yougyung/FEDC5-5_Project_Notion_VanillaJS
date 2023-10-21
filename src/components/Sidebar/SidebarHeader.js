export default function SidebarHeader({ $target, onDocumentAdded }) {
  const $sidebarHeader = document.createElement('div');
  $target.appendChild($sidebarHeader);

  const $headerNameBar = document.createElement('div');
  $sidebarHeader.appendChild($headerNameBar);
  $headerNameBar.innerHTML = '재웅님의 Obsidian';

  this.render = () => {
    $sidebarHeader.innerHTML = `
    <h3>재웅님의 Obsidian</h3>
    <button class="add-button">새 문서 작성하기</button>`;
  };

  $sidebarHeader.addEventListener('click', () => {
    const $addButton = e.target.closest('.add-button');

    if ($addButton) {
      onDocumentAdded(null);
    }
  });

  this.render();
}
