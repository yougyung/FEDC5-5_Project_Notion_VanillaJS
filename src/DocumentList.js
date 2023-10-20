export default function DocumentList({
  $target,
  initialState,
  onClickDocument,
  onClickAddButton,
  onClickInitialAddButton,
}) {
  const $documentList = document.createElement('div');
  $documentList.className = 'document-list';

  const $initialAddButton = document.createElement('button');
  $initialAddButton.className = 'initial-add-button';
  $initialAddButton.textContent = '최상위 문서 추가';

  $target.appendChild($documentList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const renderDocuments = (documents) => {
    return `
      <ul>
        ${documents
          .map(
            (document) => `
          <li data-id="${document.id}" class="document-item">
            <span>${document.title}</span>
            <button class='add-button'>+</button>
            ${
              document.documents && document.documents.length > 0
                ? renderDocuments(document.documents)
                : ''
            }
          </li>
        `,
          )
          .join('')}
      </ul>
    `;
  };

  this.render = () => {
    $documentList.innerHTML = renderDocuments(this.state);

    $documentList.prepend($initialAddButton);
  };

  $initialAddButton.addEventListener('click', async () => {
    if (onClickInitialAddButton) {
      onClickInitialAddButton();
    }
  });
  $documentList.addEventListener('click', (e) => {
    const $li = e.target.closest('li');

    if ($li) {
      const { id } = $li.dataset;
      const { className } = e.target;

      if (className === 'add-button') {
        onClickAddButton(id);
      } else {
        onClickDocument(id);
      }
    }
  });
  this.render();
}
