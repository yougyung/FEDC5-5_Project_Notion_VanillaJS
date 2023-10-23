export default function Editor({
  $target,
  initialState = { title: "", content: "" },
}) {
  const $editor = document.createElement("div");
  this.state = initialState;

  $editor.innerHTML = `
    <input class="editor-input" type="text" name="title" placeholder="Untitled" style="width:600px">
    <div class="editor-content" name="content" contentEditable="true" placeholder="내용을 입력해주세요" style="width:600px;height:400px;border:none;padding:8px"></div>`;

  $editor.style.width = "600px";
  $editor.style.height = "auto";
  $target.appendChild($editor);
}
