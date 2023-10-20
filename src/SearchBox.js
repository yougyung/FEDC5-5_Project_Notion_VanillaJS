export default function SearchBox({ $target, initialState }) {
  const $searchBox = document.createElement("div");
  $searchBox.classList.add("search_box");
  $target.appendChild($searchBox);

  $searchBox.innerHTML = "[ 여긴 검색 박스 ]";
}
