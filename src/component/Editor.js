export default function Editor({
  $target,
  initialState = { title: "", content: "" },
  onEditing,
}) {
  const $editor = document.createElement("div");
  $editor.classList = "editor";
  let isInitialize = false;

  this.state = initialState;

  $target.appendChild($editor);

  this.setState = (nextState) => {
    this.state = nextState;
    $editor.querySelector("[name=title]").value = this.state.title;
    $editor.querySelector("[name=content]").value = this.state.content;
    this.render();
  };

  this.render = () => {
    if (!isInitialize) {
      $editor.innerHTML = `
    <input type='text' name='title' plcaehold= "제목을 입력하세요." value="${this.state.title}"/>
    <textarea name='content'>${this.state.content}</textarea>
    
  `;
      isInitialize = true;
    }
  };

  this.render();
