export default function SideHeader({ $target, initialState }) {
  const $sideHeader = document.createElement("div");
  $target.appendChild($sideHeader);
  this.state = initialState;

  this.render = () => {
    $sideHeader.innerHTML = `<p>${this.state.username}</p>`;
  };
  this.render();
}
