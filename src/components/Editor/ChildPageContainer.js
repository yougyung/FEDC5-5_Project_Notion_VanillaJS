export default function ChildPageContainer({
  $target,
  initialState,
  onSubPageClick,
}) {
  const $childPageContainer = document.createElement("ul");
  $childPageContainer.className = "child_page_container";
  this.state = initialState;
  $target.appendChild($childPageContainer);

  this.render = () => {
    //console.log(this.state);
    $childPageContainer.innerHTML = `
    ${this.state.map(
      (page) =>
        `<li data-id=${page.id} class='child_page'><span>${page.title}</span></li>`
    )}
    
  `;
  };
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };
  this.render();
  $childPageContainer.addEventListener("click", (e) => {
    //console.log(e.target.closest("li").dataset.id);
    const { id } = e.target.closest("li").dataset;
    this.state.forEach((page) => {
      if (+page.id === +id) onSubPageClick(id);
    });
  });
}
