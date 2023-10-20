export default function EditHeader({ $target, initialState }) {
  const $editHeader = document.createElement('header');
  $editHeader.className = 'edit-header';
  $target.appendChild($editHeader);

  this.state = initialState;

  this.setState = (nextState) => {
    const { selectedDoc } = nextState;

    this.state = selectedDoc.title;

    this.render();
  };

  this.render = () => {
    $editHeader.innerHTML = !!this.state
      ? `
      <input type="text" id="title" name="title" placeholder="제목 없음" value="${this.state}"/>
     `
      : '';
    // $editHeader.innerHTML = `
    //  <input type="text" id="title" name="title" placeholder="제목 없음" value="${this.state}"/>
    // `;
  };

  this.render();
  // focus 이벤트
  const $editHeaderInput = document.querySelector('input#title');

  if (!!$editHeaderInput) {
    $editHeaderInput.addEventListener('focus', (e) => {
      const $input = e.target;
      $input.placeholder = '';
    });

    $editHeaderInput.addEventListener('blur', (e) => {
      const $input = e.target;
      if ($input.text !== '') $input.placeholder = '제목 없음';
    });
  }
}
