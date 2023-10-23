export default function CreateEditTextElement({
  target,
  className,
  text = "",
  focusTarget,
}) {
  const createElement = document.createElement("div");
  createElement.setAttribute("contenteditable", "true");
  if (className) {
    createElement.setAttribute("class", className);
  }
  createElement.textContent = text;

  if (focusTarget) {
    target.insertBefore(createElement, focusTarget.nextSibling);
  } else {
    target.appendChild(createElement);
  }
  createElement.focus();
}
