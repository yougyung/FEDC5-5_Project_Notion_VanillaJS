export default function Editor({
  $target,
  initialState = {
    title: '',
    content: '',
  },
}) {
  const $editor = document.createElement('div');
  $editor.className = 'editor';
  $editor.innerHTML = `
    <input type="text" name="title" />
    <div name="content" contentEditable="true"style="width:100%; height:100%; border:1px solid black; padding: 8px;"></div>
  `;
  $target.appendChild($editor);
  this.state = initialState;

  this.setState = async (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = async () => {
    $editor.querySelector('[name=title]').value = this.state.title;
    $editor.querySelector('[name=content]').innerHTML = this.state.content;
  };

  // 값 업데이트는 여기서, 로컬저장은 밖에서
  $editor.querySelector('[name=title]').addEventListener('keyup', (e) => {
    const nextState = {
      ...this.state,
      title: e.target.value,
    };
    this.setState(nextState);
    // 로컬 스토리지 저장
    // onEditing(this.state);
  });
  $editor.querySelector('[name=content]').addEventListener('input', (e) => {
    const nextState = {
      ...this.state,
      content: e.target.innerHTML,
    };
    this.setState(nextState);
  });
  this.render();
}
