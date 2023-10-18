import { makeDocTree } from './makeDocTree.js';

export default function SideNav({ $target, initialState }) {
  const $sideNav = document.createElement('nav');
  $sideNav.className = 'nav-container';
  $target.appendChild($sideNav);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    let docList = ``;

    this.state.map((document) => {
      docList = makeDocTree(document, 1, docList);
    });

    $sideNav.innerHTML = docList;
  };

  this.render();
}
