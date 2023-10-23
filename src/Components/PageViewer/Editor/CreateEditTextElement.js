export default function CreateEditTextElement({
  target,
  className,
  text = "",
  focusTarget,
  noContentEdit,
  element = "div",
}) {
  const createElement = document.createElement(element);
  createElement.textContent = text;
  if (!noContentEdit) {
    createElement.setAttribute("contenteditable", "true");
  }
  if (className) {
    createElement.setAttribute("class", className);
  }

  if (focusTarget) {
    target.insertBefore(createElement, focusTarget.nextSibling);
  } else {
    target.appendChild(createElement);
  }

  setTimeout(() => {
    createElement.focus();
  }, 0);

  this.getElement = () => {
    return createElement;
  };
}
