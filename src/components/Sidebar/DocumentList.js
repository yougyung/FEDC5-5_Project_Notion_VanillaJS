// GET 요청을 통해 Document List를 호출, 사이드바에 렌더링
export default function DocumentList({
  $target,
  initialState,
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
                <button data-id="${document.id}">▶︎</button>
                  ${document.title}
                  ${
                    document.documents.length > 0 && !document.isFolded
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
    const $toggleButton = e.target.closest('button');

    // 각 li 태그에 부착된 접기/펼치기 버튼 클릭 시 해당 버튼의 id를 상위 컴포넌트에 전달
    // id와 매칭된 document의 isFolded 값을 토글
    if ($toggleButton) {
      const { id } = $toggleButton.dataset;
      onDocumentClick(Number(id));
    }
  });
}
