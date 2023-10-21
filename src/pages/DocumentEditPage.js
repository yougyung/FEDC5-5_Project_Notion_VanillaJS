import EditorBody from '../components/Editor/EditorBody.js';
import EditorHeader from '../components/Editor/EditorHeader.js';

export default function DocumentEditPage({
  $target,
  initialState = { id: undefined, title: '', content: '' },
}) {
  const $documentEditPage = document.createElement('div');

  this.state = initialState;

  const editorHeader = new EditorHeader({
    $target: $documentEditPage,
    title: this.state.title,
    onEditing: () => {},
  });

  const editorBody = new EditorBody({
    $target: $documentEditPage,
    content: this.state.content,
    onEditing: () => {},
  });

  this.setState = (nextState) => {
    this.state = nextState;
    editorHeader.setState(this.state.title);
    editorBody.setState(this.state.content);
    this.render();
  };

  this.render = () => {
    $target.appendChild($documentEditPage);
  };
}
