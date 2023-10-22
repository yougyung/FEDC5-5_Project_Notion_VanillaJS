export default function Index({ $target }) {
  const $div = document.createElement("div");
  $target.appendChild($div);
  $div.innerText = "이 페이지는 메인 페이지 입니다.";
}
