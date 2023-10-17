export default function Sidebar({ $target, initialState }) {
  const $siderbar = document.createElement("aside");
  $target.appendChild($siderbar);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $siderbar.innerHTML = `
            <ul>
                ${this.state
                  .map(
                    (document) =>
                      `<li data-id=${document.id}>${document.title}</li>`
                  )
                  .join("")}
            </ul>
        `;
  };

  this.render();
}
