export default function DocumentList({ $target, initialState }) {
  this.state = initialState;
  this.setState = nextState => {
    this.state = nextState;
    this.render();
  };
  const $documentList = document.createElement('div');
  $target.appendChild($documentList);

  this.createDocumentTree = state => `<ul>
        ${state
          .map(document => {
            const ans = [];
            ans.push(`<li data-id="${document.id}">${document.title}</li>`);
            if (document.documents.length) {
              ans.push(this.createDocumentTree(document.documents));
            }
            return ans.join('');
          })
          .join('')}
      </ul>`;

  this.render = () => {
    if (!Array.isArray(this.state)) return;

    $documentList.innerHTML = this.createDocumentTree(this.state);
  };

  this.render();
}
