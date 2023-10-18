export default function ListInfo({ target, state }) {
  const listInfoElement = document.createElement('div')
  listInfoElement.setAttribute('class', 'menubar_docList_list')
  target.appendChild(listInfoElement)

  this.state = state
  const { title, isToggle, id } = this.state


  /* checkbox */
  const checkboxElement = document.createElement('input')
  checkboxElement.setAttribute('type', 'checkbox')
  checkboxElement.setAttribute('class', 'menubar_docList_list_checkbox')
  listInfoElement.appendChild(checkboxElement)

  /* title */

  const titleElement = document.createElement('p')
  titleElement.setAttribute('class', 'menubar_docList_list_title')
  titleElement.textContent = title
  listInfoElement.appendChild(titleElement)

  /* new */

  const insertButton = document.createElement('button')
  insertButton.setAttribute('class', 'menubar_docList_list_insertButton')
  insertButton.textContent = 'insert'
  listInfoElement.appendChild(insertButton)


  /* delete */

  const deleteButton = document.createElement('button')
  deleteButton.setAttribute('class', 'menubar_docList_list_deleteButton')
  deleteButton.textContent = 'delete'
  listInfoElement.appendChild(deleteButton)
}
