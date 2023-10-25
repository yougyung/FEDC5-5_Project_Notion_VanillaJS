export default function CreateEditTextElement({
  target,
  className,
  text = "",
  insertBeforeTarget,
  noContentEdit,
  element = "div",
}) {
  const createElement = document.createElement(element);
  createElement.innerHTML = text;
  if (!noContentEdit) {
    createElement.setAttribute("contenteditable", "true");
  }
  if (className) {
    createElement.setAttribute("class", className);
  }

  if (insertBeforeTarget) {
    target.insertBefore(createElement, insertBeforeTarget.nextSibling);
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
