export default function ListInfo({ target, state }) {
  const { title } = state;

  const listInfoElement = document.createElement("div");
  listInfoElement.setAttribute("class", "menubar_pageList_list_info");
  target.appendChild(listInfoElement);

  /* checkbox */
  const checkboxElement = document.createElement("input");
  checkboxElement.setAttribute("type", "checkbox");
  checkboxElement.setAttribute("class", "menubar_pageList_list_info_checkbox");
  listInfoElement.appendChild(checkboxElement);

  /* title */

  const titleElement = document.createElement("a");
  titleElement.setAttribute("class", "menubar_pageList_list_info_title");
  titleElement.textContent = title;
  listInfoElement.appendChild(titleElement);

  /* new */

  const insertButton = document.createElement("button");
  insertButton.setAttribute("class", "menubar_pageList_list_info_insertButton");
  insertButton.textContent = "insert";
  listInfoElement.appendChild(insertButton);

  /* delete */

  const deleteButton = document.createElement("button");
  deleteButton.setAttribute("class", "menubar_pageList_list_info_deleteButton");
  deleteButton.textContent = "delete";
  listInfoElement.appendChild(deleteButton);
}
