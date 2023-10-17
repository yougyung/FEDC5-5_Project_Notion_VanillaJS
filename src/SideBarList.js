export default function SideBarList({ $target, initialState }) {
  const $sideBarList = document.createElement("div");
  $target.appendChild($sideBarList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    // prettier-ignore
    $sideBarList.innerHTML = `
      <ul>
        ${this.state.map((li) => `
          <li data-id=${li.id}>
            ${li.title}
            ${li.documents.length ?
              `<ul> ${li.documents.map((lili) => `<li data-id=${li.id}>${lili.title}</li>`).join("")} </ul>`
              : ``
            }
          </li>`
        ).join("")}
      </ul>
    `;
  };
  this.render();
}
