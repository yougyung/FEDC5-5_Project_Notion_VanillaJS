/*
 * DocumentsList
 * - DocumentObject
 *  - DocumentObject
 *  - ...
 * - DocumentObject
 * - ...
 * - NewDocumentButton
 * */
import DocumentObject from './DocumentObject.js';
import { getItem, setItem } from '../../utils/storage.js';
import styleInJS from '../../style/tagStyles.js';
import NewDocumentButton from '../molecules/NewDocumentButton.js';
import { request } from '../../services/api.js';
import { push } from '../../utils/router.js';

export default function DocumentsList({ $target, initialState }) {
  const $documentsContainer = document.createElement('div');
  $documentsContainer.style.width = '100%';
  $target.appendChild($documentsContainer);

  const $documentsList = document.createElement('ul');
  styleInJS({ $target: $documentsList, styleTagName: 'DocumentsList' });
  $documentsContainer.appendChild($documentsList);

  $documentsList.addEventListener('click', e => {
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

  new NewDocumentButton({ $target: $documentsContainer, onCreateDocument, isHidden: false });

  this.state = initialState;

  this.setState = nextState => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $documentsList.innerHTML = '';

    this.state.forEach(state => {
      const $details = document.createElement('details');

      const openIds = getItem('openDocumentIds')?.map(Number);
      openIds?.includes(state.id) && $details.setAttribute('open', 'true');

      new DocumentObject({
        $target: $details,
        currentDocumentData: { title: state.title, id: state.id },
      });

      $documentsList.appendChild($details);
      if (state.documents.length) {
        new DocumentsList({ $target: $details, initialState: state.documents });
      } else {
        const $span = document.createElement('span');
        $span.setAttribute('data-type', 'document');
        $span.textContent = '하위 페이지가 없습니다.';
        $details.appendChild($span);
      }
    });
  };

  this.render();
}
