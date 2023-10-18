/*
initialState = {title,content,caret:{title,content}} 
*/
import Storage from "../utils/storage.js";
export default function Editor({ $target, initialState, documentAutoSave }) {
  const $editor = document.createElement("section");
  $editor.classList.add("editor");
  const storage = new Storage(window.localStorage);
  $target.appendChild($editor);
  this.state = initialState;
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };
  $editor.innerHTML = `
  <input style="width:600px" data-name="title" value="${this.state.title}" />
  <textarea style="border:solid 2px black; width:600px; height:500px;" data-name="content" value="${this.state.content}"/>
  `;
  this.render = () => {
    $editor
      .querySelectorAll("[data-name]")
      .forEach((node) => (node.value = this.state[node.dataset.name]));
  };
  $editor.addEventListener("input", (e) => {
    if (!e.target.dataset) return;
    const { name } = e.target.dataset;
    const nextState = {
      ...this.state,
      [name]: e.target.value,
    };
    this.setState(nextState);
  });
  this.render();
}
