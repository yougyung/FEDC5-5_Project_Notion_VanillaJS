export default function Editor({ $target, initialState, onEditing }) {
  const $editor = document.createElement("div");
  $editor.className = "editor";
  $editor.innerHTML = `
    <input class='editor_title' type="text" name="title" placeholder='제목을 입력하세요'/>
    <div class='editor_content' name="content" contentEditable='true'></div>
  `;
  this.state = initialState;
  $target.appendChild($editor);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };
  this.parseContent = (content) => {
    if (!content) return "";

    const richContent = content
      .split("<div>")
      .map((line) => {
        //console.log(line);
        line = line.replace("</div>", "");
        console.log(line);
        if (line === "") return "";
        if (line.indexOf("# ") === 0) {
          console.log("1");
          line = line.replace(/[\#]{1}(.+)/g, "<div><h1>$1</h1></div>");
        } else if (line.indexOf("## ") === 0) {
          line = line.replace(/[\#]{2}(.+)/g, "<div><h2>$1</h2></div>");
        } else if (line.indexOf("### ") === 0) {
          line = line.replace(/[\#]{3}(.+)/g, "<div><h3>$1</h3></div>");
        } else if (line.indexOf("#### ") === 0) {
          line = line.replace(/[\#]{4}(.+)/g, "<div><h4>$1</h4></div>");
        } else {
          line = `<div>${line}</div>`;
        }
        return line;
      })
      .join("");

    return richContent;
  };
  this.render = () => {
    console.log(this.state);
    $editor.querySelector("[name=title]").value = this.state.title;

    const $content = $editor.querySelector("[name=content]");

    $content.innerHTML = this.parseContent(this.state.content);
  };

  $editor.querySelector("[name=title]").addEventListener("keyup", (e) => {
    this.setState({ ...this.state, title: e.target.value });
    onEditing(this.state);
  });

  $editor.querySelector("[name=content]").addEventListener("input", (e) => {
    this.setState({ ...this.state, content: e.target.innerHTML });
    onEditing(this.state);

    const selection = window.getSelection();
    const range = document.createRange();

    selection.removeAllRanges();
    range.selectNodeContents(e.target);
    range.collapse(false);
    selection.addRange(range);
    e.target.focus();
  });
}
