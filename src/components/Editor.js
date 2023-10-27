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
    const richContent = transform(this.state.content);

    $editor.querySelector("#editor-title").value = this.state.title;
    $editor.querySelector("#editor-content").innerHTML = richContent;
  };

  const transform = (text) => {
    let h1Pattern = /<div>#\s+(.*?)<\/div>/g;
    let h2Pattern = /<div>##\s+(.*?)<\/div>/g;
    let h3Pattern = /<div>###\s+(.*?)<\/div>/g;
    let h4Pattern = /<div>####\s+(.*?)<\/div>/g;
    let boldPattern = /\*\*(.*?)\*\*/g;
    let italicPattern = /_(.*?)_/g;
    let strikePattern = /~~(.*?)~~/g;
    let emptyPattern = /<[^>]*>(?:\s*|&nbsp;)*<\/[^>]*>/g;

    return text
    .replace(h1Pattern, "<div><h1>$1</h1></div>")
    .replace(h2Pattern, "<div><h2>$1</h2></div>")
    .replace(h3Pattern, "<div><h3>$1</h3></div>")
    .replace(h4Pattern, "<div><h4>$1</h4></div>")
    .replace(boldPattern, "<b>$1</b>")
    .replace(italicPattern, "<i>$1</i>")
    .replace(strikePattern, "<s>$1</s>")
    .replace(/&nbsp;/g, " ")
    .replace(/\n/g, "<br>")
    .replace(/<h1><br><\/h1>/g, "<br>")
    .replace(/<h2><br><\/h2>/g, "<br>")
    .replace(/<h3><br><\/h3>/g, "<br>")
    .replace(/<h4><br><\/h4>/g, "<br>")
    .replace(/<i><br><\/i>/g, "<br>")
    .replace(/<b><br><\/b>/g, "<br>")
    .replace(/<s><br><\/s>/g, "<br>")
  }

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

    const isDiv = e.target.innerHTML.includes("<div>");

    this.setState({
      ...this.state,
      content: isDiv ? e.target.innerHTML : `<div>${e.target.innerHTML}</div>`,
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
    if (parent.childNodes.length === 0) {
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

  document.addEventListener("selectionchange", () => {
    const $editBox = $editor.querySelector(".edit-button-wrap");

    if (!document.getSelection().isCollapsed) {
      const { parentElement } = document.getSelection().focusNode;
      const rect = parentElement.getBoundingClientRect();

      const x = rect.left - 370;
      const y = rect.top - 90;

      $editBox.style.top = `${y}px`;
      $editBox.style.left = `${x}px`;
      $editBox.classList.remove("hide");
    } else {
      $editBox.classList.add("hide");
    }
  });
}
