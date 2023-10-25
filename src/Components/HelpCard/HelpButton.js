export default function HelpButton({ target, onClick }) {
  this.state = true;
  this.setState = () => {
    this.state = !this.state;
  };
  const helpButtonElement = document.createElement("button");
  helpButtonElement.setAttribute("class", "app_helpButton");

  const messageElement = document.createElement("div");
  messageElement.setAttribute("class", "app_helpButton_message");
  messageElement.textContent = "마크다운 사용법 🧐";
  helpButtonElement.appendChild(messageElement);

  const buttonImgElement = document.createElement("img");
  buttonImgElement.setAttribute("class", "app_helpButton_img");
  buttonImgElement.setAttribute("src", "/src/Img/Help_Icon.svg");
  helpButtonElement.appendChild(buttonImgElement);

  buttonImgElement.addEventListener("mouseover", () => {
    messageElement.style.opacity = 1;
  });
  buttonImgElement.addEventListener("mouseout", () => {
    messageElement.style.opacity = 0;
  });

  target.appendChild(helpButtonElement);

  buttonImgElement.addEventListener("click", () => {
    onClick(this.state);
  });

  window.addEventListener("click", (e) => {
    if (e.target !== buttonImgElement && !this.state) {
      e.preventDefault();
      onClick(this.state);
    }
  });
}
