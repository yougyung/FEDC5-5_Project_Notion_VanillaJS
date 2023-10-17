export default function DocumentList({ 
  $target, 
  initialState, 
  onClickDocument, 
  onClickAddButton 
}) {
  const $documentList = document.createElement('div');
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
            ${document.title}
            <button class='add-button'>+</button>
            ${
              document.documents && document.documents.length > 0
                ? renderDocuments(document.documents)
                : ''
            }
          </li>
        `
          )
          .join('')}
      </ul>
    `;
  };

  this.render = () => {
    $documentList.innerHTML = renderDocuments(this.state);
  };

  $documentList.addEventListener('click', (e) => {
    const $li = e.target.closest('li');
    
    if($li) {
      const { id } = $li.dataset;
      const { className } = e.target;

      if (className === 'add-button') {
        onClickAddButton();
      } else {
        onClickDocument(id);
      }
    }
  });
  this.render();
}
