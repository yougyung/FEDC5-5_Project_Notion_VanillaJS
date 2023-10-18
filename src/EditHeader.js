export default function EditHeader({ $target, initialState }) {
  const $editHeader = document.createElement('header');
  $editHeader.className = 'edit-header';
  $target.appendChild($editHeader);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $editHeader.innerHTML = `
     <h1>노션 클로닝</h1>
    `;
  };

  this.render();
}
