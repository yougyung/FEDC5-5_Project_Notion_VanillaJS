export default function Editor({ target, state }) {
  const editorElement = document.createElement('div')
  editorElement.setAttribute('class', 'pageViewer_editor')
  target.appendChild(editorElement)

  this.state = state

  editorElement.textContent = this.state.title
}
