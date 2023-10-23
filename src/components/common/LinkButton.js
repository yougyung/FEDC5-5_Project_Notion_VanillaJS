export default function LinkButton({
  $target,
  buttonName,
  className,
  buttonType,
}) {
  const $button = document.createElement("button");
  $button.textContent = buttonName;
  $button.className = className;
  $button.type = buttonType;
  $target.appendChild($button);
}
