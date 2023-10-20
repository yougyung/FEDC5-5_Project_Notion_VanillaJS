export default function ErrorPage({ $target }) {
  const $errorPage = document.createElement("div");
  $target.appendChild($errorPage);
  this.render = () => {
    $errorPage.innerHTML = `
    컴포넌트가 존재하지 않습니다!
    `;
    return $errorPage;
  };
}
