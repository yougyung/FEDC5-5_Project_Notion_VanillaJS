import { makeDocTree } from './makeDocTree.js';

export default function SideNav({
  $target,
  initialState,
  onClickPlusBtn,
  onClickDeleteBtn,
  onClickDoc,
}) {
  const $sideNav = document.createElement('nav');
  $sideNav.className = 'nav-container';

  const $navHeader = document.createElement('div');
  $navHeader.className = 'nav-header';
  $sideNav.appendChild($navHeader);

  const $navDocuments = document.createElement('div');
  $navDocuments.className = 'nav-documents';
  $sideNav.appendChild($navDocuments);

  $target.appendChild($sideNav);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;

    this.render();
  };

  this.render = () => {
    $navHeader.innerHTML = `
    <div class="nav-header-title">개인 페이지</div>
    <button data-id="root" class="nav-plus-btn">➕</button>
    `;

    let docList = [];

    makeDocTree(this.state.docsTree, 1, docList);

    const joinDoc = docList.join('');

    $navDocuments.innerHTML = joinDoc;
  };

  this.render();

  // onClickPlusBtn & onClickDeleteBtn & onClickDoc
  $sideNav.addEventListener('click', async (e) => {
    const { className, dataset } = e.target;

    if (className === 'nav-plus-btn') {
      onClickPlusBtn(dataset.id);
    }

    if (className === 'nav-delete-btn') {
      onClickDeleteBtn(dataset.id);
    }

    if (className === 'nav-document') {
      onClickDoc(dataset.id);
    }
  });
}