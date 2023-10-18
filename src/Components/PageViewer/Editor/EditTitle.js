export default function EditTitle({ target, title }) {
  const inputElement = document.createElement('input')
  inputElement.setAttribute('class', 'pageViewer_editor_title')
  target.appendChild(inputElement)

  inputElement.value = title

}
