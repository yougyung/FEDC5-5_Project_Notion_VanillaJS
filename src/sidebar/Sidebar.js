import SidebarHeader from "./SidebarHeader.js";

export default function Sidebar({ $target, initialState }) {
  const $sidebar = document.createElement("aside");
  $target.appendChild($sidebar);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $sidebar.innerHTML = `
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

  new SidebarHeader({
    $target,
    username: "Roto",
  });

  this.render();
}
