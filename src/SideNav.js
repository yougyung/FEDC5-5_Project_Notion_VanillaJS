import { request } from './api.js';
import { makeDocTree } from './makeDocTree.js';

export default function SideNav({
  $target,
  initialState,
  onClickPlusBtn,
  onClickDeleteBtn,
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

  this.setState = async (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = async () => {
    $navHeader.innerHTML = `
    <div class="nav-header-title">개인 페이지</div>
    <button data-id="root" class="nav-plus-btn">➕</button>
    `;

    let docList = ``;

    this.state.map((document) => {
      docList = makeDocTree(document, 1, docList);
    });

    $navDocuments.innerHTML = docList;
  };

  this.render();

  this.fetchDocTree = async () => {
    const docs = await request('/documents', {
      method: 'GET',
    });

    this.setState(docs);
  };

  this.fetchDocTree();

  // onClickButton
  $sideNav.addEventListener('click', (e) => {
    const { className, dataset } = e.target;

    if (className === 'nav-plus-btn') {
      onClickPlusBtn(dataset.id);
    }

    if (className === 'nav-delete-btn') {
      onClickDeleteBtn(dataset.id);
    }
  });
}
