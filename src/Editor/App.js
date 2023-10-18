import Editor from "./Editor.js";

// Editor 폴더의 App
export default function App({ $target, initialState }) {
  const $editor = document.createElement("div");

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;

    editor.setState(this.state);
  };

  // 에디터 컴포넌트
  const editor = new Editor({
    $target: $editor,
    initialState,
  });

  this.render = () => {
    $target.appendChild($editor);
  };

  this.render();
}
