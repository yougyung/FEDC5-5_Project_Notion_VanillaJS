/*
 * DeleteDocumentButton
 * - Button : 문서 지우기
 * */

import { request } from '../../services/api.js';
import { push } from '../../utils/router.js';

export default function DeleteDocumentButton({ $target, currentDocumentData, isHidden }) {
  this.$addDocumentButton = document.createElement('button');
  this.$addDocumentButton.style.visibility = `${isHidden ? 'hidden' : 'visible'}`;
  this.$addDocumentButton.textContent = 'x';

  const { id, parentId } = currentDocumentData;

  this.$addDocumentButton.addEventListener('click', async e => {
    e.stopPropagation();

    const deleteRes = await request(`/documents/${id}`, { method: 'DELETE' });

    parentId ? push(`/documents/${parentId}`) : push('/');
  });

  $target.appendChild(this.$addDocumentButton);
}
