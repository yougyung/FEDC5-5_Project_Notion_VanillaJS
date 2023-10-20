/*
 *  DocumentObject
 * - DocumentLinkButton + NewDocumentButton
 * */

import NewDocumentButton from '../molecules/NewDocumentButton.js';
import DocumentLinkButton from '../molecules/DocumentLinkButton.js';

export default function DocumentObject({ $target, state }) {
  const $summary = document.createElement('summary');
  $summary.style.width = '100%';
  $summary.style.display = 'inline-flex';
  $summary.style.justifyContent = 'space-between';
  $summary.textContent = '> ';
  $target.appendChild($summary);

  new DocumentLinkButton({ $target: $summary, title: state.title, documentId: state.id });
  const newDocumentButton = new NewDocumentButton({ $target: $summary, parentId: state.id });

  $summary.addEventListener('mouseover', e => {
    newDocumentButton.$addDocumentButton.style.visibility = 'visible';
  });

  $summary.addEventListener('mouseout', e => {
    newDocumentButton.$addDocumentButton.style.visibility = 'hidden';
  });
}
