import { push } from '../../util/router.js';

// GET 요청을 통해 Document List를 호출, 사이드바에 렌더링
export default function DocumentList({
  $target,
  initialState,
  onDocumentFoldToggle,
  onDocumentAdded,
  onDocumentClick,
}) {
  const $documentList = document.createElement('div');
  $target.appendChild($documentList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const renderDocuments = (documents) => {
      return `
        <ul>
          ${documents
            .map(
              (document) =>
                `<li data-id="${document.id}">
                  <button class="toggle-button" data-id="${
                    document.id
                  }">▶︎</button>
                  ${document.title}
                  <button class="add-button" data-id="${document.id}">+</button>
                  ${
                    document.documents && !document.isFolded
                      ? renderDocuments(document.documents)
                      : ''
                  }
                </li>`,
            )
            .join('')}
        </ul>`;
    };

    $documentList.innerHTML = renderDocuments(this.state);
  };

  $documentList.addEventListener('click', (e) => {
    const $toggleButton = e.target.closest('.toggle-button');
    const $addButton = e.target.closest('.add-button');
    const $li = e.target.closest('li');

    if ($toggleButton) {
      onDocumentFoldToggle(Number($toggleButton.dataset.id));
    } else if ($addButton) {
      onDocumentAdded(Number($addButton.dataset.id));
    } else if ($li) {
      const { id } = $li.dataset;
      onDocumentClick(id);
      push(`/documents/${id}`);
    }
  });
}
