export default function DocumentList({
  $target,
  initialState = { selectedDocument: null, documentList: [] },
}) {
  const $div = document.createElement("div");

  $target.appendChild($div);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    console.log(this.state);
    this.render();
  };
  this.render = () => {
    const { selectedDocument, documentList } = this.state;
    console.log(documentList);
    $div.innerHTML = `
            <ul>
                ${documentList
                  .map(
                    (doc) => `
                    <li>${doc.title}</li>
                `
                  )
                  .join("")}
            </ul>
        
        `;
  };
  this.render();
}
