export default function Editor({ $target, initialState, onEditing }) {
  const $editor = document.createElement("div");
  $target.appendChild($editor);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState; //{id: 101456, title: '새로 만든 페이지', createdAt: '2023-10-18T04:52:39.676Z', updatedAt: '2023-10-18T04:52:39.680Z', content: null, …}

    this.render();
  };

  let isInit = true;
  this.render = () => {
    if (isInit) {
      $editor.innerHTML = `
      <input type="text" name="title" style="width:300px" value = "${this.state.title}" />
      <textarea name="content" style="width:300px; height:200px">${this.state.content}</textarea>
    `;
    }
    isInit = false;
  };

  $editor.addEventListener("keyup", (e) => {
    const nextState = { ...this.state, [e.target.name]: e.target.value };
    this.setState(nextState);
    onEditing(nextState);
    if (e.target.name === "title") {
      const content = e.target.value;
      window.dispatchEvent(
        new CustomEvent("render-SideBarList", {
          detail: {
            content,
          },
        })
      );
    }
  });
}
