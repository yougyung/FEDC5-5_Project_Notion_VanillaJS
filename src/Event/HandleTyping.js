export default function handleTyping({ event }) {
  if (event.key !== " ") {
    return;
  }
  const text = event.target.innerHTML;
  const target = event.target;

  if (text.indexOf("# ") === 0 || text.indexOf("#&nbsp;") === 0) {
    if (target.hasAttribute("class")) {
      target.removeAttribute("class");
    }
    target.classList.add("h1");

    const replaced = text.replace(/#./, "").replace(/nbsp;/, " ");
    target.innerText = replaced;
    target.focus();
  }
  if (text.indexOf("## ") === 0 || text.indexOf("##&nbsp;") === 0) {
    if (target.hasAttribute("class")) {
      target.removeAttribute("class");
    }
    target.classList.add("h2");

    const replaced = text.replace(/##./, "").replace(/nbsp;/, " ");
    target.innerText = replaced;
    target.focus();
  }
  if (text.indexOf("### ") === 0 || text.indexOf("###&nbsp;") === 0) {
    if (target.hasAttribute("class")) {
      target.removeAttribute("class");
    }
    target.classList.add("h3");

    const replaced = text.replace(/###./, "").replace(/nbsp;/, " ");
    target.innerText = replaced;
    target.focus();
  }
}
