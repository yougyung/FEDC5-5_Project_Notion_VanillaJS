import { push } from '../../utils/router.js';
import NotionTitle from '../molecules/NotionTitle.js';

/*
 * NotionSideBar
 * - NotionTitle
 * - DocumentList
 * */

export default function NotionSideBar({ $target, initialState }) {
  const $notionSideBar = document.createElement('div');
  $target.style.display = 'flex';
  $notionSideBar.style.flexDirection = 'column';
  $target.appendChild($notionSideBar);

  this.state = initialState;
  this.setState = nextState => {
    this.state = nextState;
    this.render();
  };
  const $documentList = document.createElement('div');

  $documentList.addEventListener('click', e => {
    const $li = e.target.closest('li');
    if (!$li) return;
    e.preventDefault();
    const { id } = e.target.dataset;
    console.log(id);
    push(`/documents/${id}`);
  });

  new NotionTitle({ $target: $notionSideBar, title: "Hun's Notion" });

  this.createDocumentTree = state =>
    state
      .map(
        document =>
          `<details><summary>${document.title}</summary> ${
            document.documents.length ? `<ul>${this.createDocumentTree(document.documents)}</ul>` : '<ul>undefined</ul>'
          }</details>`
      )
      .join('');

  this.render = () => {
    if (!Array.isArray(this.state)) return;
    console.log(this.state);

    // $documentList.innerHTML = this.createDocumentTree(this.state);
    $documentList.innerHTML = this.createDocumentTree(this.state);
    $notionSideBar.appendChild($documentList);
  };

  this.render();
}
