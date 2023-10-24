import { checkToggled } from "../../../LocalStorage/LocalStorage.js";

export default function ListInfo({ target, state }) {
  const { title, id, depth } = state;

  const listInfoElement = document.createElement("div");
  listInfoElement.setAttribute("class", "menubar_pageList_list_info");
  listInfoElement.style.paddingLeft = `${16 * depth}px`;
  target.appendChild(listInfoElement);

  /* checkbox */
  const checkboxElement = document.createElement("input");
  checkboxElement.setAttribute("type", "checkbox");
  checkboxElement.setAttribute("class", "menubar_pageList_list_info_checkbox");
  checkboxElement.setAttribute("id", `checkBox_${id}`);
  listInfoElement.appendChild(checkboxElement);
  if (checkToggled(id)) {
    checkboxElement.setAttribute("checked", "true");
  }

  const labelElement = document.createElement("label");
  labelElement.setAttribute("class", "menubar_pageList_list_info_label");
  labelElement.setAttribute("for", `checkBox_${id}`);
  labelElement.textContent = "≡";
  listInfoElement.appendChild(labelElement);

  /* title */

  const titleElement = document.createElement("a");
  titleElement.setAttribute("class", "menubar_pageList_list_info_title");
  titleElement.textContent = title;
  listInfoElement.appendChild(titleElement);

  /* new */

  const insertButton = document.createElement("button");
  insertButton.setAttribute("class", "menubar_pageList_list_info_insertButton");
  insertButton.textContent = "+";
  listInfoElement.appendChild(insertButton);

  /* delete */

  const deleteButton = document.createElement("button");
  deleteButton.setAttribute("class", "menubar_pageList_list_info_deleteButton");
  deleteButton.textContent = "×";
  listInfoElement.appendChild(deleteButton);
}
