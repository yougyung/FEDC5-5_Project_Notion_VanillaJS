export default function Leef({ $parent, data, onClick }) {
  const $element = document.createElement("div");
  $element.classList.add("leef");

  $parent.appendChild($element);

  this.render = () => {
    const top = Math.floor(Math.random() * 81) + 10;
    const left = Math.floor(Math.random() * 81) + 10;
    const rotate = Math.floor(Math.random() * 41) - 20;

    $element.setAttribute(
      "style",
      `top: ${top}%; left: ${left}%; transform: rotate(${rotate}deg);`
    );

    $element.innerHTML = `
        <a class="leef-title">
            ${data}
        </a>
    `;
  };
  this.render();

  $element.addEventListener("click", onClick);
}
