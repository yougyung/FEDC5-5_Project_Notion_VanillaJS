export default function Button({
  $target,
  attributes = [],
  content = "",
  onClick = () => {},
}) {
  const $button = document.createElement("button");
  attributes.forEach((attribute) => {
    const { name, value } = attribute;
    if (name === "class") {
      //클래스는 여러개라면 배열로 넣어줍니다
      const values = Array.isArray(value) ? value : [value];
      values.forEach((className) => {
        $button.classList.add(className);
      });
    } else {
      $button.setAttribute(name, value);
    }
  });
  $target.appendChild($button);
  this.render = () => {
    $button.innerHTML = content;
  };
  $button.addEventListener("click", (e) => {
    onClick(e);
  });
  this.render();
}
