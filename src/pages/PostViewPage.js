import Editor from "../Editor.js";

export default function PostViewPage({ $target, initialState }) {
  const $page = document.createElement("div");
  $page.className = "post-view-page";

  $target.appendChild($page);

  this.state = initialState;
  this.setState = (nextState) => {
    this.state = nextState;

    editor.setState(this.state);
    this.render();
  };

  const editor = new Editor({ $target: $page, initialState });

  this.render = () => {};
  this.render();
}
