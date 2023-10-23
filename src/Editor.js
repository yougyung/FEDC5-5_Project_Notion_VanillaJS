export default function Editor({ $target, initialState, onEditing }) {
  const $editor = document.createElement("div");
  $target.appendChild($editor);

  this.state = initialState;

  this.setState = (nextState) => {
    let isInit = this.state.id === nextState.id; //같은 id면 수정중일테니까 새로 렌더하진 않는다.

    this.state = nextState; //{id: 101456, title: '새로 만든 페이지', createdAt: '2023-10-18T04:52:39.676Z', updatedAt: '2023-10-18T04:52:39.680Z', content: null, …}

    if (!isInit) {
      this.render();
    }
  };

  this.render = () => {
    $editor.innerHTML = `
      <h1 contenteditable="true" class="editor_title" >${this.state.title}</h1>
      <textarea name="content" style="width:300px; height:200px">${this.state.content}</textarea>
    `;
  };

  $editor.addEventListener("keyup", async (e) => {
    if (e.target.className === "editor_title") {
      const nextState = {
        ...this.state,
        title: e.target.innerHTML,
      };
      this.setState(nextState);
      await onEditing(nextState, "title");
      const content = e.target.innerText;
      console.log("CustomEvent 타이틀수정실행");
      window.dispatchEvent(
        new CustomEvent("render-SideBarList", {
          detail: {
            content,
          },
        })
      );
    } else {
      onEditing(nextState, "content");
    }
  });
}
