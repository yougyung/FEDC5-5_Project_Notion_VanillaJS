export default function DocumentHeader({ $target, initialState: { title } }) {
  const $documentHeader = document.createElement("header");
  $documentHeader.className = "document-header";
  $target.appendChild($documentHeader);

  this.state = {
    title,
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $documentHeader.innerHTML = `
      <section class="document-header-left">${
        (title ?? "제목 없음") || (title === "" && "제목 없음")
      }</section>
      <i class="fa-regular fa-trash-can delete-button"></i>
        `;
  };

  $documentHeader.addEventListener("click", (event) => {
    const { target } = event;
    if (target.classList.contains("delete-button")) {
      console.log("delete");
    }
  });

  this.render();
}
