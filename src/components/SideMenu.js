export default function SideMenu({ $target, initialState, onSelect }) {
  const $nav = document.createElement("nav");
  $target.appendChild($nav);
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $nav.innerHTML = `<h1>Documents</h1><ul>${this.state
      .map((document) => `<li data-id="${document.id}">${document.title}</li>`)
      .join(
        ""
      )}<li><form><input class="new-document" type="text" placeholder="Add document"></form></li></ul>`;
  };

  $nav.addEventListener("click", (e) => {
    const $li = e.target.closest("li[data-id]");
    if ($li) {
      const { id } = $li.dataset;
      onSelect(id);
    }
  });
}
