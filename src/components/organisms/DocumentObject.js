/*
 *  DocumentObject
 * - DocumentLinkButton + NewDocumentButton
 * */

import NewDocumentButton from '../molecules/NewDocumentButton.js';
import DocumentLinkButton from '../molecules/DocumentLinkButton.js';
import DeleteDocumentButton from '../molecules/DeleteDocumentButton.js';

export default function DocumentObject({ $target, currentDocumentData }) {
  const { title, id } = currentDocumentData;
  const $summary = document.createElement('summary');
  $summary.style.width = '100%';
  $summary.style.display = 'inline-flex';
  $summary.style.justifyContent = 'space-between';
  $summary.textContent = '> ';
  $target.appendChild($summary);

  new DocumentLinkButton({ $target: $summary, title, documentId: id });

  const deleteDocumentButton = new DeleteDocumentButton({
    $target: $summary,
    currentDocumentData,
    isHidden: true,
  });
  const newDocumentButton = new NewDocumentButton({ $target: $summary, currentId: id, isHidden: true });

  $summary.addEventListener('mouseover', e => {
    newDocumentButton.$addDocumentButton.style.visibility = 'visible';
    deleteDocumentButton.$addDocumentButton.style.visibility = 'visible';
  });

  $summary.addEventListener('mouseout', e => {
    newDocumentButton.$addDocumentButton.style.visibility = 'hidden';
    deleteDocumentButton.$addDocumentButton.style.visibility = 'hidden';
  });
}
