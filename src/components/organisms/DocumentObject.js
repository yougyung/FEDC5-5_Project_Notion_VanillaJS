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
  const { title, id } = currentDocumentData;
  const $summary = document.createElement('summary');
  $summary.textContent = '> ';
  styleInJS({ $target: $summary, styleTagName: 'DocumentObject' });
  $target.appendChild($summary);

  new DocumentLinkButton({ $target: $summary, title, documentId: id });

  const onDeleteDocument = async () => {
    await request(`/documents/${id}`, { method: 'DELETE' });
    const newOpenIds = getItem('openDocumentIds')?.filter(openId => openId !== String(id));
    setItem('openDocumentIds', newOpenIds);
    push('/');
  };

  const onCreateDocument = async () => {
    const postResponse = await request('/documents', {
      method: 'POST',
      body: { title: '첫 화면', parent: id },
    });
    push(`/documents/${postResponse.id}`);
  };

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
}
