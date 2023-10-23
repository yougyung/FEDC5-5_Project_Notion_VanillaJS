export default function DocumentHeader({ $target, onClickPageAddButton }) {
  const $documentHeader = document.createElement('div');
  $documentHeader.className = 'document-header';

  const $pageName = document.createElement('div');
  $pageName.className = 'page-name';
  $pageName.textContent = '개인 페이지';

  const $group = document.createElement('div');
  $group.className = 'group';
  
  const $addButton = document.createElement('button');
  $addButton.textContent = '+';
  $addButton.className = 'page-add-button';

  const $span = document.createElement('span');
  $span.textContent = '페이지 추가';

  $group.appendChild($addButton);
  $group.appendChild($span);

  $documentHeader.appendChild($pageName);
  $documentHeader.appendChild($group);

  $target.appendChild($documentHeader);

  $documentHeader.addEventListener('click', (e) => {
    const { target } = e;
    if (target.className === 'page-add-button') {
      if (onClickPageAddButton) {
        onClickPageAddButton();
      }
    }
  });
}
