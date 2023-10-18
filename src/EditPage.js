import EditHeader from './EditHeader.js';
import Editor from './Editor.js';

export default function EditPage({ $target, initialState }) {
  const $editPage = document.createElement('div');
  $editPage.className = 'edit-main';
  $target.appendChild($editPage);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {};

  this.render();

  new EditHeader({ $target: $editPage });

  new Editor({ $target: $editPage, initialState });
}
