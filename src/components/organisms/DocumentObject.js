/*
 *  DocumentObject
 * - DocumentLinkButton + NewDocumentButton
 * */

import NewDocumentButton from '../molecules/NewDocumentButton.js';
import DocumentLinkButton from '../molecules/DocumentLinkButton.js';
import DeleteDocumentButton from '../molecules/DeleteDocumentButton.js';
import { request } from '../../services/api.js';
import { push } from '../../utils/router.js';
import { getItem, setItem } from '../../utils/storage.js';
import styleInJS from '../../style/tagStyles.js';

export default function DocumentObject({ $target, currentDocumentData }) {
  const $summary = document.createElement('summary');

  styleInJS({ $target: $summary, styleTagName: 'DocumentObject' });
  $target.appendChild($summary);

  this.state = currentDocumentData;

  this.setState = nextState => {
    this.state = nextState;
    this.render();
  };

  const onDeleteDocument = async () => {
    await request(`/documents/${this.state.id}`, { method: 'DELETE' });
    const newOpenIds = getItem('openDocumentIds')?.filter(openId => openId !== String(this.state.id));
    setItem('openDocumentIds', newOpenIds);
    push('/');
  };

  const onCreateDocument = async () => {
    const postResponse = await request('/documents', {
      method: 'POST',
      body: { title: '첫 화면', parent: this.state.id },
    });
    push(`/documents/${postResponse.id}`);
  };

  this.render = () => {
    $summary.innerHTML = '';
    $summary.textContent = '> ';
    const documentLinkButton = new DocumentLinkButton({
      $target: $summary,
      title: this.state.title,
      documentId: this.state.id,
    });
    const saveTitle = getItem(`SAVE_DOCUMENT_TITLE_KEY-${this.state.id}`);
    saveTitle && documentLinkButton.setState(saveTitle);
    const $setting = document.createElement('span');
    $summary.appendChild($setting);

    const deleteDocumentButton = new DeleteDocumentButton({
      $target: $setting,
      onDeleteDocument,
      isHidden: true,
    });

    const newDocumentButton = new NewDocumentButton({
      $target: $setting,
      onCreateDocument,
      isHidden: true,
    });

    $summary.addEventListener('mouseover', e => {
      newDocumentButton.$addDocumentButton.style.visibility = 'visible';
      deleteDocumentButton.$addDocumentButton.style.visibility = 'visible';
    });

    $summary.addEventListener('mouseout', e => {
      newDocumentButton.$addDocumentButton.style.visibility = 'hidden';
      deleteDocumentButton.$addDocumentButton.style.visibility = 'hidden';
    });
  };

  this.render();
}
