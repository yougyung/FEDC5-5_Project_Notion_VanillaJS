export default function Editor({ $target, initialState }) {
  const $editor = document.createElement("form");
  $editor.style.display = "flex";
  $editor.style.flexDirection = "column";
  $target.appendChild($editor);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    // $editor.innerHTML = `
    // <div>${this.state.title}</div>
    // <div>${this.state.content ?? ""}</div>
    // `;
    $editor.innerHTML = `
            <input class="title" type="text" placeholder="제목 없음" value="${
              this.state.title
            }" />
            <textarea class="content" placeholder="빈 페이지">${
              this.state.content ?? ""
            }</textarea>
        `;
  };

  this.render();
}
