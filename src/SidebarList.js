export default function SidebarList({ $target, initialState }) {
  const $sidebartitle = document.createElement('ul');
  $sidebartitle.className = 'sidebar__content';
  this.state = initialState;

  $target.appendChild($sidebartitle);

  this.render = (documents, $container) => {
    documents.forEach((doc) => {
      const documentDiv = document.createElement('li');
      documentDiv.className = 'document-item';
      documentDiv.innerText = doc.title;

      if (doc.documents && doc.documents.length > 0) {
        const $subDocumentContainer = document.createElement('ul');
        $subDocumentContainer.className = 'sub-document-list';
        this.render(doc.documents, $subDocumentContainer);
        documentDiv.appendChild($subDocumentContainer);
      }

      $container.appendChild(documentDiv);
    });
  };

  this.setState = async (nextState) => {
    this.state = nextState;
    // 상태가 변경될 때마다 리스트를 새로 렌더링하도록 함
    $sidebartitle.innerHTML = ''; // 이전에 렌더링된 내용을 제거
    this.render(this.state, $sidebartitle);
  };

  this.render(this.state, $sidebartitle);
}
