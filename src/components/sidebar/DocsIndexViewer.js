/**
 * @description 사이드바의 DOCS 목차 뷰
 */
export default function DocsIndexViewer({ $parent, initState }) {
  const $component = document.createElement("div");
  $component.setAttribute("id", "docs-index-viewer");

  $parent.appendChild($component);

  this.state = initState;
  this.setState = (nextState) => {
    this.state = { ...this.state, ...nextState };
    this.render();
  };

  this.render = () => {};
  this.render();
}
