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

  $notionSideBar.addEventListener('click', e => {
    const $sidebar = e.target.closest('div[data-notionSideBar]');
    if (!$sidebar) return;

    const { type, id } = e.target.dataset;
    if (type === 'document') {
      e.preventDefault();
      id && push(`/documents/${id}`);
    } else {
      const details = e.target.closest('details');
      const { id } = details.querySelector('summary span').dataset;
      if (details.open) {
        const nextOpenIds = getItem('openDocumentIds').filter(openId => openId !== id);
        details.setAttribute('open', 'false');
        setItem('openDocumentIds', nextOpenIds);
      } else {
        const currentOpenIds = getItem('openDocumentIds');
        const nextOpenIds = currentOpenIds ? [...currentOpenIds, id] : [id];
        setItem('openDocumentIds', nextOpenIds);
      }
    }
  });

  const onCreateDocument = async () => {
    const postResponse = await request('/documents', {
      method: 'POST',
      body: { title: '첫 화면', parent: null },
    });
    push(`/documents/${postResponse.id}`);
  };

  new NotionTitle({ $target: $notionSideBar, title: "Hun's Notion" });

  const documentList = new DocumentsList({ $target: $notionSideBar, initialState: this.state, isOpenDocuments: [] });

  new NewDocumentButton({ $target: $notionSideBar, onCreateDocument, isHidden: false });
}
