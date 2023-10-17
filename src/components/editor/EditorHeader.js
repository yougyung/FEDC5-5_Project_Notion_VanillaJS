/**
 * @description 편집기 뷰의 편집 유틸 헤더
 */
export default function EditorHeader({ $parent, initState }) {
  const $component = document.createElement("div");
  $component.setAttribute("id", "editor-header");
  $component.classList.add("view-inner");

  $parent.appendChild($component);

  this.state = initState;
  this.setState = (nextState) => {
    this.state = { ...this.state, ...nextState };
    this.render();
  };

  this.render = () => {};
  this.render();
}
