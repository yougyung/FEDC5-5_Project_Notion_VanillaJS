export default function SubList({ target, state }) {
  const { id, title } = state;

  const listElement = document.createElement("li");
  listElement.setAttribute("data-id", id);
  listElement.setAttribute("class", "pageViewer_subPage_subPageList_subList");
  target.appendChild(listElement);

  const titleElement = document.createElement("p");
  titleElement.setAttribute(
    "class",
    "pageViewer_subPage_subPageList_subList_title"
  );
  titleElement.textContent = title;
  listElement.appendChild(titleElement);
}
