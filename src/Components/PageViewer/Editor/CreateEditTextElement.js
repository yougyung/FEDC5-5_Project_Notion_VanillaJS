export default function CreateEditTextElement({
  target,
  className,
  text = "",
  focusTarget,
  noContentEdit,
}) {
  const createElement = document.createElement("div");
  if (!noContentEdit) {
    createElement.setAttribute("contenteditable", "true");
  }
  if (className) {
    createElement.setAttribute("class", className);
  }
  createElement.textContent = text;

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
