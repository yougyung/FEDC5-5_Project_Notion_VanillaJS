import { push } from '../../utils/router.js';
import NotionTitle from '../molecules/NotionTitle.js';
import DocumentsList from '../organisms/DocumentsList.js';
import NewDocumentButton from '../molecules/NewDocumentButton.js';

/*
 * NotionSideBar
 * - NotionTitle
 * - DocumentsList
 * */

export default function NotionSideBar({ $target, initialState }) {
  const $notionSideBar = document.createElement('div');
  $notionSideBar.style.display = 'flex';
  $notionSideBar.style.flexDirection = 'column';
  $notionSideBar.style.width = '300px';
  $notionSideBar.style.height = '100vh';
  $notionSideBar.style.backgroundColor = '#e9ecef';

  $target.appendChild($notionSideBar);

  this.state = initialState;
  this.setState = nextState => {
    this.state = nextState;
    documentList.setState(this.state);
  };

  $notionSideBar.addEventListener('click', e => {
    const { type, id } = e.target.dataset;
    const $details = e.target.closest('details');

    if (type === 'document') {
      e.preventDefault();
      push(`/documents/${id}`);
    }
  });

  new NotionTitle({ $target: $notionSideBar, title: "Hun's Notion" });

  const documentList = new DocumentsList({ $target: $notionSideBar, initialState: this.state });

  new NewDocumentButton({ $target: $notionSideBar, currentId: null, isHidden: false });
}
