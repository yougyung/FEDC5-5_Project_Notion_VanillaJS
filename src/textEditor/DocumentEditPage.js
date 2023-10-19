import Editor from "./Editor.js";

export default function DocumentEditPage({ $target, initialState, onEditing }) {
  const $documentEditPage = document.createElement("section");
  $target.appendChild($documentEditPage);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {};

  this.render();

  const editor = new Editor({
    $target,
    initialState: {
      title: "",
      content: "",
    },
  });
}
