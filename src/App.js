import Editor from "./component/Editor.js";

export default function App({ $target, initialState }) {
  const $documentList = document.createElement("div");
  $target.appendChild($documentList);
  this.state = initialState;
  console.log(this.state);
  new Editor({
    $target,
    initialState: {
      title: "제목입니다",
      content: "내용이에요",
    },
  });
  this.render = () => {
    $documentList.innerHTML = `
        <ul>
            ${this.state
              .map((document) => `<li>${document.id} | ${document.title}</li>`)
              .join("")}
        </ul>
        `;
  };
  this.render();
}
