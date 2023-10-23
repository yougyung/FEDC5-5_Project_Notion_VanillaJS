export default function EditorFooter({ $target, initialState }) {
  const $editorFooter = document.createElement('div');
  $target.appendChild($editorFooter);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const renderDocuments = (documents) => {
      return `
          ${documents
            .map(
              (document) => `
              <button class="link-button data-id="${document.id}">${
                document.title
              }</button>

              ${document.documents ? renderDocuments(document.documents) : ''}
              `,
            )
            .join('')}`;
    };

    if (this.state.documents) {
      $editorFooter.innerHTML = `<div>${this.state.title}의 하위 문서</div>
      
      ${
        this.state.documents.length > 0
          ? renderDocuments(this.state.documents)
          : '하위 문서가 존재하지 않습니다.'
      }`;
    }
  };

  this.render();
}
