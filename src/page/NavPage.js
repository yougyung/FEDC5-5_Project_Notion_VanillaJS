import DocumentList from "../component/DocumentList.js";

//initialState = [{id:num, title:string, content:string, createdAt:time, updatedAt:time,}]
export default function NavPage({
  $target,
  initialState,
  createDocument,
  deleteDocument,
}) {
  const $nav = document.createElement("nav");
  this.state = initialState;
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };
  this.render = () => {
    $target.appendChild($nav);
    documentList.setState(this.state);
  };
  const documentList = new DocumentList({
    $target: $nav,
    initialState: this.state,
    createDocument,
    deleteDocument,
  });
}
