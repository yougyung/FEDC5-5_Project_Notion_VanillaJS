import EditButtons from "./EditButtons.js";

export default function Editor({ $target, initialState, onEditing }) {
  const $editor = document.createElement("div");
  $editor.setAttribute("class", "editor-wrap");

  $editor.innerHTML = `
    <input type="text" id="editor-title" name="title" placeholder="제목을 입력해주세요." />
    <div id="editor-content" contentEditable="true" style="width: 600px;"></div>
  `;

  $target.appendChild($editor);

  const $content = $editor.querySelector("#editor-content");

  const editButtons = new EditButtons({
    $target: $editor,
    onClick: (nextContent) => {
      this.setState({
        ...this.state,
        content: nextContent,
      });
      onEditing(this.state);
      $content.blur();
    },
  });

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    $editor.querySelector("#editor-title").value = this.state.title || "";
    $editor.querySelector("#editor-content").innerHTML =
      this.state.content || "";
    editButtons.setState(this.state.content);
    this.render();
  };

  this.render = () => {
    let richContent = this.state.content
      .split("<div>")
      .map((line) => {
        if (line.indexOf("# ") === 0) {
          return `<h1>${line.substr(2)}</h1>`;
        } else if (line.indexOf("## ") === 0) {
          return `<h2>${line.substr(3)}</h2>`;
        } else if (line.indexOf("### ") === 0) {
          return `<h3>${line.substr(4)}</h3>`;
        } else if (line.indexOf("#### ") === 0) {
          return `<h4>${line.substr(5)}</h4>`;
        } else if (line.indexOf("**") !== -1) {
          const startIndex = line.indexOf("**");
          const endIndex = line.lastIndexOf("**");
          if (endIndex > 0) {
            const before = line.slice(0, startIndex);
            const after = line.slice(endIndex + 2);
            const slicedText = line.slice(startIndex + 2, endIndex);
            return `${before}<b>${slicedText}</b>${after}`;
          } else {
            return line;
          }
        } else if (line.indexOf("_") !== -1) {
          const startIndex = line.indexOf("_");
          const endIndex = line.lastIndexOf("_");
          if (endIndex > 0) {
            const before = line.slice(0, startIndex);
            const after = line.slice(endIndex + 1);
            const slicedText = line.slice(startIndex + 1, endIndex);
            return `${before}<i>${slicedText}</i>${after}`;
          } else {
            return line;
          }
        } else if (line.indexOf("~~") !== -1) {
          const startIndex = line.indexOf("~~");
          const endIndex = line.lastIndexOf("~~");
          if (endIndex > 0) {
            const before = line.slice(0, startIndex);
            const after = line.slice(endIndex + 2);
            const slicedText = line.slice(startIndex + 2, endIndex);
            return `${before}<s>${slicedText}</s>${after}`;
          } else {
            return line;
          }
        }
        return line;
      })
      .filter((e) => e != "")
      .join("<div>");

    richContent = richContent
      .replace(/&nbsp;/g, " ")
      .replace(/\n/g, "<br>")
      .replace(/<i><\/i>/g, "")
      .replace(/<b><\/b>/g, "")
      .replace(/<s><\/s>/g, "")
      .replace(/<div><br><\/div>/gi, "<br>");

    $editor.querySelector("#editor-title").value = this.state.title;
    $editor.querySelector("#editor-content").innerHTML = richContent;
  };

  $editor.querySelector("#editor-title").addEventListener("keyup", (e) => {
    const parentId = history.state ? history.state.parentId : null;

    this.setState({
      ...this.state,
      title: e.target.value,
      parentId,
    });

    onEditing(this.state);
  });

  $content.addEventListener("compositionend", (e) => {
    const selection = window.getSelection();
    const node = selection.focusNode;
    const offset = selection.focusOffset;
    const postion = getCursorPosition($content, node, offset, {
      postion: 0,
      done: false,
    });

    if (offset === 0) postion.postion += 0.5;

    this.setState({
      ...this.state,
      content: e.target.innerHTML,
    });

    selection.removeAllRanges();
    const range = setCursorPosition($content, document.createRange(), {
      postion: postion.postion,
      done: false,
    });

    range.collapse(true);
    selection.addRange(range);
    onEditing(this.state);
  });

  const getCursorPosition = (parent, node, offset, state) => {
    if (state.done) return state;

    let currentNode = null;
    if (parent.childNodes.length == 0) {
      state.postion += parent.textContent.length;
    } else {
      for (let i = 0; i < parent.childNodes.length && !state.done; i++) {
        currentNode = parent.childNodes[i];
        if (currentNode === node) {
          state.postion += offset;
          state.done = true;
          return state;
        } else getCursorPosition(currentNode, node, offset, state);
      }
    }
    return state;
  };

  const setCursorPosition = (parent, range, state) => {
    if (state.done) return range;

    if (parent.childNodes.length == 0) {
      if (parent.textContent.length >= state.postion) {
        range.setStart(parent, state.postion);
        state.done = true;
      } else {
        state.postion = state.postion - parent.textContent.length;
      }
    } else {
      for (let i = 0; i < parent.childNodes.length && !state.done; i++) {
        let currentNode = parent.childNodes[i];
        setCursorPosition(currentNode, range, state);
      }
    }
    return range;
  };
}
