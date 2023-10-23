import Editor from "./Editor.js";

export default function DocumentEditPage({ $target, initialState }) {
  const $page = document.createElement("div");
  $page.classList.add("document-edit-page");

  this.state = initialState;

  const editor = new Editor({
    $target: $page,
    initialState: { title: "", content: "" },
  });

  this.setState = (nextState) => {
    this.state = nextState;
    // this.render();
  };

  this.render = () => {
    $target.appendChild($page);
  };

  this.render();
}
