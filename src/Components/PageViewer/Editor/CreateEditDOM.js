export default function CreateEditDOM({ target, className, text = "" }) {
  const createElement = document.createElement("div");
  createElement.setAttribute("contenteditable", "true");
  if (className) {
    createElement.setAttribute("class", className);
  }
  createElement.textContent = text;
  target.appendChild(createElement);
  createElement.focus();
}
