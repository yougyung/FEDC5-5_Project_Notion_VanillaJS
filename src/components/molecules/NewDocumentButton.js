/*
 * NewDocumentButton
 * - Button : 새 문서 만들기
 * */

import { request } from '../../services/api.js';
import { push } from '../../utils/router.js';

export default function NewDocumentButton({ $target, parentId, isHidden }) {
  this.$addDocumentButton = document.createElement('button');
  this.$addDocumentButton.style.visibility = `${isHidden ? 'hidden' : 'visible'}`;
  this.$addDocumentButton.textContent = '+';
  this.$addDocumentButton.addEventListener('click', async e => {
    e.stopPropagation();
    const postResponse = await request('/documents', {
      method: 'POST',
      body: { title: '제목 없음', parent: parentId },
    });
    push(`/documents/${postResponse.id}`);
  });

  $target.appendChild(this.$addDocumentButton);
}
