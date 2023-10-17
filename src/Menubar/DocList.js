export default function DocListBox({ target, state }) {
  const docListBoxElement = document.createElement('ul')
  target.appendChild(docListBoxElement)

  console.log(state)

}
