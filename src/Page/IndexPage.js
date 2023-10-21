export default function IndexPage({ target }) {
  const indexPageElement = document.createElement("h1");
  indexPageElement.setAttribute("class", "pageViewer_indexPage");
  indexPageElement.textContent = `
  IndexPage\n
  페이지 사용법 추가 예정
  `;

  target.appendChild(indexPageElement);

  this.getElement = () => {
    return indexPageElement;
  };
}
