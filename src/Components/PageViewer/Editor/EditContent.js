export default function EditContent({ target, content }) {
  const editContentElement = document.createElement('div')
  editContentElement.setAttribute('class', 'pageViewer_editor_content')
  editContentElement.setAttribute('data-name', 'content')
  editContentElement.setAttribute('contentEditable', 'true')
  target.appendChild(editContentElement)

  editContentElement.textContent = content


}
