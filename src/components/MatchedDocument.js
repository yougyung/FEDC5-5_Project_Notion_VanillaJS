export default function MatchedDocument({ $target, initialState }) {
  const $link = document.createElement("a");
  $target.appendChild($link);
  this.state = initialState;
  this.setState = (nextState) => {
    this.state = nextState;
  };
  window.addEventListener("input-change", (e) => {
    const { id, title } = e.detail;
    $link.innerHTML = title;
    $link.href = `/${id}`;
  });
}
