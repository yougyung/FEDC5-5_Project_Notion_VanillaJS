export default function SideBar({ $target }) {
  const $sideBar = document.createElement("div");
  $sideBar.className = "side_bar";
  $target.appendChild($sideBar);

  this.render = () => {
    $sideBar.innerHTML = `
            <h1>THIS IS SIDEBAR</h1>
        `;
  };
  this.render();
}
