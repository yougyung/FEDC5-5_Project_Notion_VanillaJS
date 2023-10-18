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
     <input type="text" id="title" name="title" placeholder="제목 없음"/>
    `;
  };

  this.render();

  const $editHeaderInput = document.querySelector('input#title');

  $editHeaderInput.addEventListener('focus', (e) => {
    const $input = e.target;
    $input.placeholder = '';
  });

  $editHeaderInput.addEventListener('blur', (e) => {
    const $input = e.target;
    if ($input.text !== '') $input.placeholder = '제목 없음';
  });
}
