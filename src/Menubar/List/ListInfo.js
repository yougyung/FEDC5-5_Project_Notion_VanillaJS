export default function ListInfo({ target, state }) {
  this.state = state
  const { title, isToggle, id } = this.state


  const listInfoElement = document.createElement('div')
  listInfoElement.setAttribute('class', 'menubar_docList_list_info')
  // listInfoElement.setAttribute('data-id', id)

  target.appendChild(listInfoElement)




  /* checkbox */
  const checkboxElement = document.createElement('input')
  checkboxElement.setAttribute('type', 'checkbox')
  checkboxElement.setAttribute('class', 'menubar_docList_list_info_checkbox')
  listInfoElement.appendChild(checkboxElement)

  /* title */

  const titleElement = document.createElement('p')
  titleElement.setAttribute('class', 'menubar_docList_list_info_title')
  titleElement.textContent = title
  listInfoElement.appendChild(titleElement)

  /* new */

  const insertButton = document.createElement('button')
  insertButton.setAttribute('class', 'menubar_docList_list_info_insertButton')
  insertButton.textContent = 'insert'
  listInfoElement.appendChild(insertButton)


  /* delete */

  const deleteButton = document.createElement('button')
  deleteButton.setAttribute('class', 'menubar_docList_list_info_deleteButton')
  deleteButton.textContent = 'delete'
  listInfoElement.appendChild(deleteButton)
}
