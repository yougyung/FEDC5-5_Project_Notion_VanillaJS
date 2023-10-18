export default function EditContent({ target, content }) {
  const editElement = document.createElement('div')
  editElement.setAttribute('class', 'pageViewer_editor_content')
  target.appendChild(editElement)

  editElement.textContent = content


}
