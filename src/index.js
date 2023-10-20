export default function index({ $target }) {
  const $div = document.createElement("div");
  $target.appendChild($div);
  this.render = () => {
    $div.innerText = "이 페이지는 메인페이지입니다.";
  };

  this.render();
}
