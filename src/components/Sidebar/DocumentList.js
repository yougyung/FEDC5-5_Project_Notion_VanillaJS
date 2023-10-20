// GET 요청을 통해 Document List를 호출, 사이드바에 렌더링
export default function DocumentList({ $target, initialState }) {
  const $documentList = document.createElement('div');
  $target.appendChild($documentList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    console.log(this.state);

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
              ${document.title}
              ${
                document.documents.length > 0
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

  // 리스트 클릭
}
