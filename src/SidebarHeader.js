export default function SidebarHeader({ $target, addDocument }) {
  const $sidebarHeader = document.createElement('div');
  $sidebarHeader.className = 'sidebar__header';

  $target.appendChild($sidebarHeader);
  this.render = () => {
    $sidebarHeader.innerHTML = `
        <span class="sidebar__header__title">
            개인 페이지
        </span>
        <button class="sidebar__header__btn">추가</button>
    `;
  };

  $sidebarHeader.addEventListener('click', (e) => {
    const $button = e.target.closest('button');
    if ($button) {
      addDocument();
    }
  });

  this.render();
}
