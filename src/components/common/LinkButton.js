export default function LinkButton({ $target, buttonName, className }) {
  const $button = document.createElement("button");
  $button.textContent = buttonName;
  $button.className = className;
  $target.appendChild($button);
}
