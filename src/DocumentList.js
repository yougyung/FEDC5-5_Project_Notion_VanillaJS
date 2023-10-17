export default function DocumentList({
  $target,
  initialState,
}) {
  const $documentList = document.createElement('div');
  $target.appendChild($documentList);
  
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  }

  this.render = () => {
    $documentList.innerHTML = `
      <ul>
        ${this.state.map(document => `<li data-id="${document.id}">${document.title}</li>`).join('')}
      </ul>
    `;
  }

  this.render();
}