import { push } from '../../util/router.js';

export default function SidebarHeader({ $target, onDocumentAdded }) {
  const $sidebarHeader = document.createElement('div');
  $target.appendChild($sidebarHeader);

  this.render = () => {
    $sidebarHeader.innerHTML = `
    <h3>재웅님의 Obsidian</h3>
    <button class="add-button">
      <i class="fa fa-plus" />
      새 문서 작성하기
    </button>`;
  };

  $sidebarHeader.addEventListener('click', (e) => {
    const $addButton = e.target.closest('.add-button');
    const $header3 = e.target.closest('h3');

    if ($addButton) {
      onDocumentAdded(null);
    } else if ($header3) {
      push('/');
    }
  });

  this.render();
}
