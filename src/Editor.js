export default function Editor({ $target, initialState, onEditing }) {
  const $editor = document.createElement('div');
  $target.appendChild($editor);

  this.state = initialState;

  this.setState = (nextState) => {
    if (Object.keys(nextState).includes('content')) {
      this.state = nextState;
    } else {
      this.state = {
        ...nextState,
        title: nextState.title,
        content: '',
      };
    }
    this.render();
  };

  $editor.innerHTML = `
    <input type="text" name="title" style="width:500px;"/>
    <textarea name="content" style="width:500px;height:400px;"></textarea>
  `

  this.render = () => {
    $editor.querySelector('input[name=title]').value = this.state.title;
    $editor.querySelector('textarea[name=content]').value = this.state.content;
  };

  $editor.addEventListener('keyup', (e) => {
    const { target } = e;

    const name = target.getAttribute('name');

    if (this.state[name] !== undefined) {
      const nextState = {
        ...this.state,
        [name]: target.value,
      };
      this.setState(nextState);
      onEditing(this.state);
    }
  });
}

