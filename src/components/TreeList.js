export default function TreeList({ $container, child = {} }) {
  const $span = document.createElement("span");
  if (child.id && child.title) {
    $span.textContent = child.title;
    $span.dataset.id = child.id;
  }

  const $button = document.createElement("button");
  $button.textContent = "+";
  $button.className = "add-button";

  const $input = document.createElement("input");
  $input.type = "text";
  $input.placeholder = "문서 제목";
  $input.classList.add("document-title");
  $input.classList.add("hide");

  $span.appendChild($input);
  $span.appendChild($button);

  $container.appendChild($span);
}
