/**
 * @description 편집기 뷰의 편집 컴포넌트
 */
export default function Editor({
  $parent,
  initState = { title: "", content: "" },
}) {
  const $component = document.createElement("div");
  $component.setAttribute("id", "editor");
  $component.classList.add("view-inner");

  $parent.appendChild($component);

  $component.innerHTML = `
  <input type="text" name="title" style="width:100%;" />
  <div class="editor-input" name="content" contentEditable="true"></div>
  `;

  this.state = initState;
  this.setState = (nextState) => {
    this.state = { ...this.state, ...nextState };
    this.render();
  };

  this.render = () => {
    console.log(this.state.content);
    $component.querySelector("[name=content]").innerHTML = this.state.content;
  };
  this.render();

  $component
    .querySelector("[name=content]")
    .addEventListener("input", (event) => {
      console.log(event.target);
      const nextState = {
        ...this.state,
        content: event.target.innerText,
      };
      // this.setState(nextState);
    });
}
