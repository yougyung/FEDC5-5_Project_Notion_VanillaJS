/*
 * NewDocumentButton
 * - Button : 새 문서 만들기
 * */

import { request } from '../../services/api.js';
import { push } from '../../utils/router.js';

export default function NewDocumentButton({ $target, currentId, isHidden }) {
  this.$addDocumentButton = document.createElement('button');
  this.$addDocumentButton.style.visibility = `${isHidden ? 'hidden' : 'visible'}`;
  this.$addDocumentButton.textContent = '+';
  this.$addDocumentButton.addEventListener('click', async e => {
    e.stopPropagation();
    const postResponse = await request('/documents', {
      method: 'POST',
      body: { title: '첫 화면', parent: currentId },
    });
    push(`/documents/${postResponse.id}`);
  });

  $target.appendChild(this.$addDocumentButton);
}
