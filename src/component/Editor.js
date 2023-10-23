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
  //포커스가 풀리는 이벤트때문에, 커서가 날아가서 밖으로 빼냄. render내부 innerHTML을 작성하던 통일성이 깨졌다...
  $editor.innerHTML = `
  <input style="width:700px; height:100px; font-size:36px; font-weight:600" data-name="title" value="${this.state.title}" />
  <textarea style="border:solid 2px black; width:700px; height:500px;" data-name="content" value="${this.state.content}"/>
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
    const { id, title, content } = this.state;
    const requestBody = { title, content };
    documentAutoSave(id, requestBody);
  });
  this.render();
}
