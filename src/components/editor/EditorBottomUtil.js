const EditorBottomUtilProps = {
  childDocuments: [
    {
      id: "number",
      title: "string",
      createdAt: "string",
      updatedAt: "string",
    },
  ],
};

/**
 * @description 편집기 뷰의 하단 유틸리티 컴포넌트
 */
export default function EditorBottomUtil({ $parent, initState }) {
  const $component = document.createElement("div");
  $component.setAttribute("id", "editor-bottom-util");

  $parent.appendChild($component);

  this.state = initState;
  this.setState = (nextState) => {
    this.state = { ...this.state, ...nextState };
    this.render();
  };

  this.render = () => {};
  this.render();
}
