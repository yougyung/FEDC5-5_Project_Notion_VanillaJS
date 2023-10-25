import { makeDocTree } from './makeDocTree.js';

export default function SideNav({
  $target,
  initialState,
  onClickPlusBtn,
  onClickDeleteBtn,
  onClickDoc,
  onClickMain,
  onClickToggleBtn,
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

    const { selectedDoc } = this.state;
    const $selDoc = document.querySelector(
      `.nav-document[data-id="${selectedDoc.id}"`
    );

    if ($selDoc) $selDoc.classList.add('selected');
  };

  this.render();

  // onClickPlusBtn & onClickDeleteBtn & onClickDoc
  $navDocuments.addEventListener('click', async (e) => {
    const { className, dataset, classList } = e.target;

    if (className === 'nav-plus-btn') {
      onClickPlusBtn(dataset.id);
    }

    if (className === 'nav-delete-btn') {
      onClickDeleteBtn(dataset.id);
    }

    if (
      className === 'nav-document' ||
      className === 'nav-document-container'
    ) {
      onClickDoc(dataset.id);
    }

    if (className === 'nav-header-title') {
      onClickMain();
    }

    if (classList.contains('nav-toggle-btn')) {
      onClickToggleBtn(dataset.id);
    }
  });

  $navDocuments.addEventListener('mouseover', (e) => {
    const { classList, dataset } = e.target;

    if (
      classList.contains('nav-document') ||
      classList.contains('nav-document-container') ||
      classList.contains('nav-toggle-btn') ||
      !classList.contains('nav-delete-btn') ||
      !classList.contains('nav-plus-btn')
    ) {
      const $plusButton = document.querySelector(
        `.nav-plus-btn[data-id="${dataset.id}"]`
      );
      const $deleteButton = document.querySelector(
        `.nav-delete-btn[data-id="${dataset.id}"]`
      );

      if ($plusButton && $deleteButton) {
        $plusButton.classList.remove('hidden');
        $deleteButton.classList.remove('hidden');
      }
    }
  });

  $sideNav.addEventListener('mouseout', (e) => {
    const { classList, dataset } = e.target;

    if (
      classList.contains('nav-document') ||
      classList.contains('nav-document-container') ||
      classList.contains('nav-toggle-btn') ||
      !classList.contains('nav-delete-btn') ||
      !classList.contains('nav-plus-btn')
    ) {
      const $plusButton = document.querySelector(
        `.nav-plus-btn[data-id="${dataset.id}"]`
      );
      const $deleteButton = document.querySelector(
        `.nav-delete-btn[data-id="${dataset.id}"]`
      );

      if ($plusButton && $deleteButton) {
        $plusButton.classList.add('hidden');
        $deleteButton.classList.add('hidden');
      }
    }
  });
}
