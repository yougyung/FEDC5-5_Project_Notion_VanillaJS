export default function IndexPage({ target }) {
  const indexPageElement = document.createElement("h1");
  indexPageElement.setAttribute("class", "pageViewer_indexPage");
  indexPageElement.textContent = "IndexPage";

  target.appendChild(indexPageElement);

  this.getElement = () => {
    return indexPageElement;
  };
}
