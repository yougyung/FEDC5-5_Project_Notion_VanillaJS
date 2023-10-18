/**
 * @description 편집기 뷰의 편집 유틸 헤더
 */
export default function EditorHeader({ $parent }) {
  const $component = document.createElement("div");
  $component.setAttribute("id", "editor-header");
  $component.classList.add("view-inner");

  this.render = () => {
    $parent.appendChild($component);
  };
  this.render();
}
