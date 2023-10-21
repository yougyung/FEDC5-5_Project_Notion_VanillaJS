export default function EditContent({ target, state }) {
  const editContentElement = document.createElement("div");
  editContentElement.focus();
  editContentElement.setAttribute("class", "pageViewer_editor_content");
  editContentElement.setAttribute("data-name", "content");
  editContentElement.setAttribute("contentEditable", "true");
  target.appendChild(editContentElement);

  this.state = state;

  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };

  this.render = () => {
    editContentElement.textContent = this.state;
  };
}
