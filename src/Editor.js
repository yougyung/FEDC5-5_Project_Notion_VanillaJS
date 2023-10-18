export default function Editor({ $target, initialState }) {
  const $editor = document.createElement("div");
  $editor.className = "editor";
  $target.appendChild($editor);

  $editor.innerHTML = `
      <input type="text" placeholder="Untitled" name="title" />
      <textarea name="content"></textarea>
  `;
}
