import { request } from "../api.js";

export default function DocumentList({ $target, initialState }) {
  const $documentList = document.createElement("div");
  $target.appendChild($documentList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $documentList.innerHTML = `
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

  $documentList.addEventListener("click", async (e) => {
    const $li = e.target.closest("li");
    if ($li) {
      const { id } = $li.dataset;

      const document = await request(`/${id}`);

      console.log(document);
    }
  });
  this.render();
}
