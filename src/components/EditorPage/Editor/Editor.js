export default function Editor({ $target, initialState, onEditing }) {
  this.state = initialState;

  const $editor = document.createElement("div");

  $editor.innerHTML = `
    <input type="text" name="title" style="width:600px;"  />
    <textarea  name="content" style="width:600px;height:400px;"></textarea>
    `;

  $target.appendChild($editor);

  this.setState = nextState => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const { title, content } = this.state;

    $editor.querySelector("[name=title]").value = title;

    if (!content) {
      $editor.querySelector("[name=content]").innerHTML = "";
      return;
    }

    const richContent = content.split("\n").join("<br>");
    // .map(line => {
    //   line = line.trim();

    //   if (line.indexOf("### ") === 0) {
    //     return `<h3>${line.substr(4)}</h3>`;
    //   } else if (line.indexOf("## ") === 0) {
    //     return `<h2>${line.substr(3)}</h2>`;
    //   } else if (line.indexOf("# ") === 0) {
    //     return `<h1>${line.substr(2)}</h1>`;
    //   } else {
    //     return line;
    //   }
    // })

    // console.log("richContent : ", richContent);
    $editor.querySelector("[name=content]").innerHTML = richContent;
  };

  this.render();

  $editor.querySelector("[name=title]").addEventListener("keyup", e => {
    const nextState = {
      ...this.state,
      title: e.target.value,
    };
    this.setState(nextState);

    // 업데이트
    const { title, content } = this.state;
    const updateBody = { title, content };
    onEditing(updateBody);
  });

  /** 시간이 좀 지나면 nextState로 변환해야될듯  */
  $editor.querySelector("[name=content]").addEventListener("input", e => {
    const nextState = {
      ...this.state,
      content: e.target.value,
    };
    this.setState(nextState);

    console.log("수정 시도하려는 내용", this.state);

    // 업데이트
    const { title, content } = this.state;
    const updateBody = { title, content };
    onEditing(updateBody);
  });
}
