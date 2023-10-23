export default function Editor({
  $target,
  initialState = { title: "", content: "" },
}) {
  const $editor = document.createElement("div");
  this.state = initialState;

  $editor.innerHTML = `
    <input class="editor-input" type="text" name="title" placeholder="Untitled" style="width:600px">
    <div class="editor-content" name="content" contentEditable="true" placeholder="내용을 입력해주세요" style="width:600px;height:400px;border:none;padding:8px"></div>`;

  let isinitialize = false;

  $editor.style.width = "600px";
  $editor.style.height = "auto";
  $target.appendChild($editor);

  this.setState = (nextState) => {
    if (this.state.id !== nextState.id) {
      isinitialize = false;
    }

    this.state = nextState;

    if (!isinitialize) {
      // 렌더링이 계속 일어나지 않도록 flag 세움
      isinitialize = true;
      this.render();
    }
  };

  this.render = () => {
    console.log(this.state.content);
    // const richContent = this.state.content
    //   .split("\n")
    //   .map((line) => {
    //     return `${line}<br>`;
    //   })
    //   .join("");

    $editor.querySelector("[name=title]").value = this.state.title;
    // $editor.querySelector("[name=content]").innerHTML = richContent;
    $editor.querySelector("[name=content]").innerHTML = this.state.content;
  };

  this.render();
}
