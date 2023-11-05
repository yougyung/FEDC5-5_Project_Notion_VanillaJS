import { push } from '../../utils/router.js';
import NotionTitle from '../molecules/NotionTitle.js';
import DocumentsList from '../organisms/DocumentsList.js';
import NewDocumentButton from '../molecules/NewDocumentButton.js';
import { getItem, setItem } from '../../utils/storage.js';
import { request } from '../../services/api.js';
import styleInJS from '../../style/tagStyles.js';

/*
 * NotionSideBar
 * - NotionTitle
 * - DocumentsList
 * */

export default function NotionSideBar({ $target, initialState }) {
  const $notionSideBar = document.createElement('div');
  $notionSideBar.setAttribute('data-notionSideBar', 'notionSideBar');
  styleInJS({ $target: $notionSideBar, styleTagName: 'NotionSideBar' });

  $target.appendChild($notionSideBar);

  this.state = initialState;
  this.setState = nextState => {
    this.state = nextState;
    documentList.setState(this.state);
  };

  new NotionTitle({ $target: $notionSideBar, title: "Hun's Notion" });

  const documentList = new DocumentsList({ $target: $notionSideBar, initialState: this.state, isOpenDocuments: [] });
}
