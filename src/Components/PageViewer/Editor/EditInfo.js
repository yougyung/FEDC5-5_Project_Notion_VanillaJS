export default function EditInfo({ target, state }) {
  const infoElement = document.createElement("div");
  infoElement.setAttribute("class", "pageViewer_editor_info");
  target.appendChild(infoElement);

  const createdAtElement = document.createElement("p");
  createdAtElement.setAttribute("class", "pageViewer_editor_info_createdAt");
  infoElement.appendChild(createdAtElement);

  const updatedAtElement = document.createElement("p");
  updatedAtElement.setAttribute("class", "pageViewer_editor_info_updatedAt");
  infoElement.appendChild(updatedAtElement);

  this.state = state;

  this.setState = (newState) => {
    console.log(newState);
    this.state = newState;
    this.render();
  };

  this.render = () => {
    const { createdAt, updatedAt } = this.state;
    createdAtElement.textContent = `생성 일시 : ${createdAt}`;
    updatedAtElement.textContent = `업데이트 날짜 : ${updatedAt}`;
  };
}
